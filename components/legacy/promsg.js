// Variables
var campaignRunningIndex = null;
var stop = false;
var pause = false;

// Resolve functions of campaign
var resolveSendMessageToNumber;
var rejectSendMessageToNumber;
var resolveSendMessageToGroup;
var resolveSendAttachmentsToNumber;
var resolveSendAttachmentsToGroup;

// Handle window / tab close
window.addEventListener("beforeunload", function (e) {
  try {
    chrome.storage.local.get(["scheduled_campaigns"], async function (result) {
      let scheduled_campaigns = result.scheduled_campaigns || [];
      for (let i = 0; i < scheduled_campaigns.length; i++) {
        scheduled_campaigns[i].hasBeenScheduled = false;
      }
      chrome.storage.local.set({ scheduled_campaigns: scheduled_campaigns });
    });

    if (campaignRunningIndex !== null) {
      let obj = {
        isCampaignRunning: true,
        index: campaignRunningIndex,
      };
      chrome.storage.local.set({ resumeCampaign: obj });
    }
  } catch (e) {
    console.error("Error :: onEvent :: beforeunload :: ", e);
  }
});

function updateFreeTrialUsage(numSent) {
  chrome.storage.local.get(["freeTrialExpiredUserData"], function (result) {
    if (
      result.freeTrialExpiredUserData &&
      result.freeTrialExpiredUserData.sent_count !== undefined
    ) {
      let freeTrialExpiredUserData = result.freeTrialExpiredUserData;
      let { sent_count } = freeTrialExpiredUserData;
      sent_count += numSent;
      freeTrialExpiredUserData.sent_count = sent_count;
      chrome.storage.local.set({ freeTrialExpiredUserData });
    }
  });
}

// Time Gap Calculation Function
function getTimeGap(
  index,
  batch_size,
  time_gap,
  random_delay,
  batch_gap,
  custom_time_range = null
) {
  if (index == 0) return 1;
  if (batch_size && index % batch_size == 0) return batch_gap;

  if (random_delay) {
    if (custom_time_range && custom_time_range.from && custom_time_range.to) {
      // Validate custom range during execution to handle edge cases
      try {
        const fromValue = parseInt(custom_time_range.from);
        const toValue = parseInt(custom_time_range.to);

        // Check for invalid range values
        if (isNaN(fromValue) || isNaN(toValue) || fromValue >= toValue ||
          fromValue < 1 || toValue > 300 || fromValue > 300) {
          console.warn("Invalid custom range detected during campaign execution:", custom_time_range);
          console.warn("Falling back to default random range (3-10 seconds)");
          return getRandomNumber(3, 10);
        }

        // Apply premium restrictions during execution
        const minAllowed = 1; // During execution, we assume validation was done at start
        const adjustedFrom = Math.max(fromValue, minAllowed);
        const adjustedTo = Math.max(toValue, minAllowed);

        return getRandomNumber(adjustedFrom, adjustedTo);
      } catch (error) {
        console.error("Error processing custom time range during execution:", error);
        console.warn("Falling back to default random range due to error");
        return getRandomNumber(3, 10);
      }
    }
    return getRandomNumber(3, 10); // Default random range
  }

  return time_gap;
}

// Random Number Generator Function
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to handle custom range validation errors during campaign execution
function handleCustomRangeError(custom_time_range, messageIndex) {
  console.warn(`Custom range validation failed at message ${messageIndex + 1}:`, custom_time_range);

  // Log the specific error for debugging
  if (custom_time_range) {
    const fromValue = parseInt(custom_time_range.from);
    const toValue = parseInt(custom_time_range.to);

    if (isNaN(fromValue) || isNaN(toValue)) {
      console.warn("Custom range contains non-numeric values");
    } else if (fromValue >= toValue) {
      console.warn(`Invalid range: From (${fromValue}) >= To (${toValue})`);
    } else if (fromValue < 1 || toValue > 300) {
      console.warn(`Range out of bounds: From=${fromValue}, To=${toValue}`);
    }
  }

  console.warn("Campaign will continue using default random range (3-10 seconds)");
  return null; // Return null to indicate fallback should be used
}

// Main Messenger Function
async function messenger(
  numbers,
  message,
  time_gap,
  csv_data,
  customization,
  caption_customization,
  random_delay,
  batch_size,
  batch_gap,
  caption,
  send_attachment_first,
  campaign_type,
  index,
  paused_report_rows,
  paused_sent_count,
  attachmentsData = null,
  custom_time_range = null
) {
  trackSystemEvent("time_gap", time_gap);
  trackSystemEvent("batch_size", batch_size);
  trackSystemEvent("random_delay", random_delay);
  trackSystemEvent("batch_gap", batch_gap);

  let report_rows = initializeReport(campaign_type, paused_report_rows);
  let sent_count = paused_sent_count || 0;
  let start_index = index || 0;

  let messages = customization
    ? await setMessages(message, csv_data, "text", numbers.length)
    : Array(numbers.length).fill(message);
  let captions = isCaptionCustomisation(caption, csv_data)
    ? await setCaptions(caption, csv_data)
    : Array(numbers.length).fill(caption);
  let attachments = attachmentsData
    ? attachmentsData
    : await getAttachmentsData();

  let campaign_data = {
    numbers,
    message,
    caption,
    time_gap,
    random_delay,
    batch_size,
    batch_gap,
    csv_data,
    customization,
    caption_customization,
    send_attachment_first,
    campaign_type,
    custom_time_range,
  };

  // Start Campaign
  await saveCampaignState(0, false, campaign_data, report_rows, sent_count);

  let {
    report_rows: finalReport,
    sent_count: finalCount,
    total_time,
  } = await executeCampaign(
    numbers,
    messages,
    captions,
    attachments,
    start_index,
    report_rows,
    sent_count,
    campaign_data
  );

  // Save final campaign report
  let curr_report = {
    rows: finalReport,
    start_time: new Date().getTime(),
    total_time: total_time,
    time_gap: time_gap,
    campaign_type: campaign_type,
    sent_count: finalCount,
    custom_time_range: custom_time_range,
  };

  await updateDeliveryReports(numbers, message, curr_report, pause);
  updateFreeTrialUsage(numbers.length);
  // chrome.storage.local.set({ 'attachmentsData': [] });
  campaignRunningIndex = null;

  // Send notification
  chrome.runtime.sendMessage({
    type: "pro_send_notification",
    title: "Your messages are sent",
    message: "Open the extension to download the report",
  });

  // Hide messenger popup and handle review popup
  var messanger_popup_div =
    document.getElementsByClassName("messanger_popup")[0];
  if (messanger_popup_div) {
    messanger_popup_div.style.display = "none";
    let rcount = parseInt(localStorage.getItem("rcount")) || 0;
    let rvisited = parseInt(localStorage.getItem("rvisited")) || 0;
    rcount++;

    if (rcount >= 3) {
      if (!rvisited) {
        callIfNoOtherPopups(review_popup);
      }
      rcount = 0;
    }

    localStorage.setItem("rcount", rcount);
  }

  // updating premium usage form attachments and multiple attachmentss
  if (attachments.length > 0) {
    chrome.storage.local.get(["premiumUsageObject"], function (result) {
      if (result.premiumUsageObject !== undefined) {
        let updatedPremiumUsageObject = {
          ...result.premiumUsageObject,
          attachment: true,
        };
        if (attachments.length > 1)
          updatedPremiumUsageObject = {
            ...updatedPremiumUsageObject,
            multipleAttachment: true,
          };
        chrome.storage.local.set({
          premiumUsageObject: updatedPremiumUsageObject,
        });
      }
    });
  }
}

function handleAutodownloadCampaignReport(reports) {
  chrome.storage.local.get(["autodownloadCampaignReport"], function (res) {
    const autoDownloadReport = res.autodownloadCampaignReport;
    if (autoDownloadReport) {
      let last_report = reports[reports.length - 1];
      let reportDataURI = encodeURI(last_report.data);
      let reportName = last_report.name || "Campaign " + reports.length;
      let reportDownloadDate = getReportDateFormat(last_report.date, true);
      let reportDownloadName = `${reportName} ${reportDownloadDate}.csv`;
      let downloadLink = document.createElement("a");
      downloadLink.href = reportDataURI;
      downloadLink.download = reportDownloadName;
      downloadLink.click();
    }
  });
}

// Campaign Executor
async function executeCampaign(
  numbers,
  messages,
  captions,
  attachments,
  start_index,
  report_rows,
  sent_count,
  campaign_data
) {
  let {
    time_gap,
    random_delay,
    batch_size,
    batch_gap,
    send_attachment_first,
    campaign_type,
    custom_time_range,
  } = campaign_data;

  // Fetch Unsubscribe Settings
  let {
    unsubscribe_enabled = false,
    unsubscribe_message = "Reply STOP to unsubscribe",
    unsubscribe_keyword = "STOP",
    unsubscribedNumbers = []
  } = await new Promise(resolve => {
    chrome.storage.local.get([
      "unsubscribe_enabled",
      "unsubscribe_message",
      "unsubscribe_keyword",
      "unsubscribedNumbers"
    ], resolve);
  });

  const isUnsubscribeActive = unsubscribe_enabled && true; // Always true since all features are free

  let total_time = 0,
    remaining_time,
    delays = [];
  let total_numbers = numbers.length;
  let total_numbers_to_sent = total_numbers - start_index;
  let not_sent_message_count = 0,
    not_sent_attachments_count = 0;

  // Calculate total time and delays with error handling
  for (let i = 0; i < numbers.length; i++) {
    let curr_time_gap;

    try {
      // For time estimation, use average for custom ranges to improve performance
      if (i == 0) {
        curr_time_gap = 1; // First message always uses 1 second
      } else if (batch_size && i % batch_size == 0) {
        curr_time_gap = batch_gap;
      } else if (random_delay && custom_time_range) {
        // Validate custom range for time estimation
        const fromValue = parseInt(custom_time_range.from);
        const toValue = parseInt(custom_time_range.to);

        if (isNaN(fromValue) || isNaN(toValue) || fromValue >= toValue ||
          fromValue < 1 || toValue > 300) {
          console.warn("Invalid custom range detected during time estimation, using default random average");
          curr_time_gap = 6.5; // Average of default 3-10 range
        } else {
          // Use average for time estimation, actual random values will be generated during execution
          curr_time_gap = Math.floor((fromValue + toValue) / 2);
        }
      } else if (random_delay) {
        // Use average for default random range
        curr_time_gap = 6.5; // Average of 3-10
      } else {
        curr_time_gap = time_gap;
      }

      // Ensure we have a valid time gap for estimation
      if (isNaN(curr_time_gap) || curr_time_gap < 1) {
        console.warn(`Invalid time gap for estimation: ${curr_time_gap}, using default`);
        curr_time_gap = random_delay ? 6.5 : (time_gap || 3);
      }

    } catch (error) {
      console.error("Error calculating time gap for estimation:", error);
      // Fallback to safe default values
      curr_time_gap = random_delay ? 6.5 : (time_gap || 3);
    }

    total_time += curr_time_gap;
    delays.push(curr_time_gap);
  }
  remaining_time = total_time;

  messanger_popup();
  checkTipsInterval();

  for (let i = start_index; i < total_numbers; i++) {
    triggerEscape();
    campaignRunningIndex = i;

    if (stop) {
      stop = false;
      break;
    }
    if (pause) {
      await saveCampaignState(i, true, campaign_data, report_rows, sent_count);
      pause = false;
      break;
    }

    // Detect if this specific item is a group (by @g.us suffix) or a phone number
    // This handles label campaigns that may contain both contacts and groups
    const isGroupItem = numbers[i].includes('@g.us');
    const isPhoneItem = numbers[i].includes('@c.us') || (!isGroupItem && campaign_type.includes("number"));

    let curr_number = "";
    let curr_group_id = "";

    if (isGroupItem || campaign_type.includes("group")) {
      curr_group_id = numbers[i];
    } else if (isPhoneItem) {
      curr_number = numbers[i].replace(/\D/g, "");
    } else {
      // Default fallback: treat as number
      curr_number = numbers[i].replace(/\D/g, "");
    }

    let curr_message = messages.length >= i ? messages[i] : "";
    let curr_caption = captions.length >= i ? captions[i] : "";
    let sending_to = curr_group_id
      ? (groupIdToName[curr_group_id] || curr_group_id.split('@')[0])
      : curr_number;
    // Update remaining time using the estimated delay for progress bar accuracy
    remaining_time -= delays[i];
    await updateMessengerProgressBar(
      sending_to,
      i,
      total_numbers,
      remaining_time,
      total_time
    );

    // Skip Unsubscribed Numbers
    const isUnsubscribed = unsubscribedNumbers.some(entry => {
      if (typeof entry === 'string') return entry === curr_number;
      return entry.number === curr_number;
    });

    if (isUnsubscribeActive && curr_number && isUnsubscribed) {
      report_rows.push([
        curr_number,
        "-",
        "-",
        "Unsubscribed",
        "-",
      ]);
      continue;
    }

    // Inject Unsubscribe Message
    if (isUnsubscribeActive && unsubscribe_message) {
      if (curr_message) {
        curr_message = curr_message + "\n\n" + unsubscribe_message;
      }
      if (curr_caption) {
        if (Array.isArray(curr_caption)) {
          curr_caption = curr_caption.map((cap) =>
            cap ? cap + "\n\n" + unsubscribe_message : cap
          );
        } else {
          curr_caption = curr_caption + "\n\n" + unsubscribe_message;
        }
      }
    }

    // Generate actual delay for execution with error handling
    let actual_time_gap;
    try {
      // Validate custom range before each use during campaign execution
      if (random_delay && custom_time_range) {
        // Re-validate custom range to handle edge cases where it might become invalid
        const fromValue = parseInt(custom_time_range.from);
        const toValue = parseInt(custom_time_range.to);

        if (isNaN(fromValue) || isNaN(toValue) || fromValue >= toValue ||
          fromValue < 1 || toValue > 300) {
          // Handle the error and update campaign data
          custom_time_range = handleCustomRangeError(custom_time_range, i);
          campaign_data.custom_time_range = custom_time_range;
        }
      }

      actual_time_gap = getTimeGap(
        i,
        batch_size,
        time_gap,
        random_delay,
        batch_gap,
        custom_time_range
      );

      // Ensure we have a valid time gap value
      if (isNaN(actual_time_gap) || actual_time_gap < 1) {
        console.warn(`Invalid time gap calculated: ${actual_time_gap}, using default value`);
        actual_time_gap = random_delay ? getRandomNumber(3, 10) : time_gap || 3;
      }

    } catch (error) {
      console.error("Error calculating time gap during campaign execution:", error);
      // Fallback to safe default values
      actual_time_gap = random_delay ? getRandomNumber(3, 10) : time_gap || 3;
      console.warn(`Using fallback time gap: ${actual_time_gap} seconds`);
    }

    let curr_delay = Math.max(1, actual_time_gap - 1) * 1000;

    await delay(curr_delay);

    let open_chat_with_msg = RUNTIME_CONFIG.useOldMessageSending
      ? curr_message
      : "";
    let is_chat_opened = curr_number
      ? await openNumber(curr_number, open_chat_with_msg)
      : true;

    if (is_chat_opened) {
      if (send_attachment_first) {
        var {
          is_attachments_sent,
          comments: attachments_comments,
          error: attachments_error,
        } = await handleAttachmentsSend(
          curr_number,
          curr_group_id,
          attachments,
          curr_caption,
          "-",
          true
        );
        var {
          is_message_sent,
          comments: message_comments,
          error: message_error,
        } = await handleMessageSend(curr_number, curr_group_id, curr_message);
      } else {
        var {
          is_message_sent,
          comments: message_comments,
          error: message_error,
        } = await handleMessageSend(curr_number, curr_group_id, curr_message);
        var {
          is_attachments_sent,
          comments: attachments_comments,
          error: attachments_error,
        } = await handleAttachmentsSend(
          curr_number,
          curr_group_id,
          attachments,
          curr_caption,
          is_message_sent
        );
      }
    } else {
      var is_message_sent = curr_message ? "NO" : "-";
      var is_attachments_sent =
        attachments && attachments.length > 0 ? "NO" : "-";
      var message_comments =
        "Invalid Number; Tip: Please ensure that your number exists on WhatsApp!";
      var attachments_comments = "";
    }

    let final_comments = [message_comments, attachments_comments]
      .filter((comment) => comment.length > 0)
      .join(" ; ");
    if (final_comments.length == 0) {
      final_comments = "-";
      sent_count++;
    }

    let final_error = [
      message_error ? String(message_error) : "",
      attachments_error ? String(attachments_error) : "",
    ]
      .filter((err) => err.length > 0)
      .join(" ; ");
    if (final_error.length == 0) {
      final_error = "-";
    }

    report_rows.push([
      sending_to,
      is_message_sent,
      is_attachments_sent,
      final_comments,
      final_error,
    ]);

    // Track success / failed events
    if (is_message_sent != "-") {
      if (message_comments.length == 0) {
        trackSystemEvent("send_message_success_total");
      } else if (is_chat_opened) {
        not_sent_message_count++;
        trackSystemEvent("send_message_failed_total", message_comments);
      }
    }

    if (is_attachments_sent != "-") {
      if (attachments_comments.length == 0) {
        trackSystemEvent("send_attachments_success_total");
      } else if (is_chat_opened) {
        not_sent_attachments_count++;
        trackSystemEvent("send_attachments_failed_total", attachments_comments);
      }
    }
  }

  // Track complete campaign success / failed events
  if (messages.length > 0 && messages[0].length > 0) {
    if (not_sent_message_count == 0)
      trackSystemEvent("send_message_complete_success");
    if (not_sent_message_count == total_numbers_to_sent)
      trackSystemEvent("send_message_complete_failed");
  }

  if (attachments && attachments.length > 0) {
    if (not_sent_attachments_count == 0)
      trackSystemEvent("send_attachments_complete_success");
    if (not_sent_attachments_count == total_numbers_to_sent)
      trackSystemEvent("send_attachments_complete_failed");
  }

  clearInterval(tipsIntervalID);
  return { report_rows, sent_count, total_time };
}

// Send Message or Attachments functions
async function handleMessageSend(number, group_id, message) {
  if (message) {
    if (number) {
      try {
        let result;
        if (RUNTIME_CONFIG.useOldMessageSending) {
          result = await sendMessageToNumber(number, message);
          // If old method fails, try new method as fallback
          if (result.is_message_sent === "NO") {
            console.log("Old method failed, trying new method as fallback");
            result = await sendMessageToNumberNew(number, message);
          }
        } else {
          result = await sendMessageToNumberNew(number, message);
        }
        return result;
      } catch (error) {
        console.error("Both message sending methods failed:", error);
        return {
          is_message_sent: "NO",
          comments: "Error sending message",
          error: error.toString(),
        };
      }
    }
    if (group_id) {
      return await sendMessageToGroup(group_id, message);
    }
  } else {
    return {
      is_message_sent: "-",
      comments: "",
    };
  }
}

async function sendMessageToNumber(number, message) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let send_message_btn = getDocumentElement("send_message_btn");
        
        console.log("Send button found:", send_message_btn);
        console.log("Current URL:", window.location.href);

        if (send_message_btn) {
          // Try to ensure the button is clickable
          if (send_message_btn.disabled) {
            console.log("Send button is disabled, enabling it");
            send_message_btn.disabled = false;
          }
          
          // Add a small delay before clicking
          setTimeout(() => {
            send_message_btn.click();
            console.log("Send button clicked");

            trackSuccess("send_message_to_number_success");
            resolve({
              is_message_sent: "YES",
              comments: "",
            });
          }, 500);
        } else {
          console.error("Send button not found. Available elements:", document.querySelectorAll('[data-icon*="send"], button[aria-label*="Send"], [data-testid*="send"]'));
          resolve({
            is_message_sent: "NO",
            comments: "Issue with the number",
            error: "Send button is not found",
          });
        }
      }, 1500); // Increased timeout to ensure WhatsApp UI is ready
    });
  } catch (e) {
    console.error("ERROR :: sendMessageToNumber :: " + e);
    trackError("send_message_to_number_error", e);
    return {
      is_message_sent: "NO",
      comments: "Error while sending message to number",
      error: e,
    };
  }
}

async function sendMessageToNumberNew(number, message) {
  try {
    let curr_chat_number = getCurrentChatNumber();
    number = curr_chat_number ? curr_chat_number : number;


    if (await isUniqueIdentifierEnabled()) {
      const modified = appendUniqueIdentifier(message, null);
      message = modified.message;
    }

    return new Promise((resolve, reject) => {
      resolveSendMessageToNumber = resolve;
      rejectSendMessageToNumber = async (payload) => {
        pasteMessage(message);
        resolve(await sendMessageToNumber());
      };

      window.dispatchEvent(
        new CustomEvent("PROS::send-message", {
          detail: {
            number: number,
            message: message,
          },
        })
      );
    });
  } catch (e) {
    console.error("ERROR :: sendMessageToNumber :: " + e);
    trackError("send_message_to_number_new_error", e);
    return {
      is_message_sent: "NO",
      comments: "Error while sending message to number",
      error: e,
    };
  }
}

async function sendMessageToGroup(group_id, message) {
  try {

    if (await isUniqueIdentifierEnabled()) {
      const modified = appendUniqueIdentifier(message, null);
      message = modified.message;
    }

    return new Promise((resolve, reject) => {
      resolveSendMessageToGroup = resolve;

      window.dispatchEvent(
        new CustomEvent("PROS::send-message-to-group", {
          detail: {
            group_id: group_id,
            message: message,
          },
        })
      );
    });
  } catch (e) {
    console.error("ERROR :: sendMessageToGroup :: " + e);
    trackError("send_message_to_group_error", e);
    return {
      is_message_sent: "NO",
      comments: "Error while sending the message to group",
      error: e,
    };
  }
}

async function handleAttachmentsSend(
  number,
  group_id,
  attachments,
  caption,
  is_message_sent,
  wait_till_send = false
) {
  if (is_message_sent === "NO") {
    return {
      is_attachments_sent: "NO",
      comments: "",
    };
  } else if (attachments && attachments.length > 0) {
    if (number) {
      return await sendAttachmentsToNumber(
        number,
        attachments,
        caption,
        wait_till_send
      );
    }
    if (group_id) {
      return await sendAttachmentsToGroup(
        group_id,
        attachments,
        caption,
        wait_till_send
      );
    }
  } else {
    return {
      is_attachments_sent: "-",
      comments: "",
    };
  }
}

async function sendAttachmentsToNumber(
  number,
  attachments,
  caption,
  wait_till_send
) {
  try {
    let curr_chat_number = getCurrentChatNumber();
    number = curr_chat_number ? curr_chat_number : number;

    if (await isUniqueIdentifierEnabled()) {
      if (Array.isArray(caption)) {

        caption = caption.map(cap => {
          if (cap && cap.trim()) {
            const modified = appendUniqueIdentifier(null, cap);

            return modified.caption;
          }
          return cap;
        });
      } else if (caption) {

        const modified = appendUniqueIdentifier(null, caption);
        caption = modified.caption;

      }
    }

    return new Promise((resolve, reject) => {
      resolveSendAttachmentsToNumber = resolve;

      window.dispatchEvent(
        new CustomEvent("PROS::send-attachments", {
          detail: {
            number: number,
            attachments: attachments,
            caption: caption,
            waitTillSend: wait_till_send,
          },
        })
      );
    });
  } catch (e) {
    console.error("ERROR :: sendAttachmentsToNumber :: " + e);
    trackError("send_attachments_to_number_error", e);
    return {
      is_attachments_sent: "NO",
      comments: "Error while sending the attachments to number",
      error: e,
    };
  }
}

async function sendAttachmentsToGroup(
  group_id,
  attachments,
  caption,
  wait_till_send
) {
  try {

    if (await isUniqueIdentifierEnabled()) {
      if (Array.isArray(caption)) {

        caption = caption.map(cap => {
          if (cap && cap.trim()) {
            const modified = appendUniqueIdentifier(null, cap);

            return modified.caption;
          }
          return cap;
        });
      } else if (caption) {
        // Single caption - add UUID
        const modified = appendUniqueIdentifier(null, caption);
        caption = modified.caption;

      }
    }

    return await new Promise((resolve, reject) => {
      resolveSendAttachmentsToGroup = resolve;

      window.dispatchEvent(
        new CustomEvent("PROS::send-attachments-to-group", {
          detail: {
            attachments: attachments,
            caption: caption,
            groupId: group_id,
            waitTillSend: wait_till_send,
          },
        })
      );
    });
  } catch (e) {
    console.error("ERROR :: sendAttachmentsToGroup :: " + e);
    trackError("send_attachments_to_group_error", e);
    return {
      is_attachments_sent: "NO",
      comments: "Error while sending the attachments to group",
      error: e,
    };
  }
}

// Open Number / Chat
async function openNumber(number, message = "", time_gap = 1) {
  try {
    await openNumberTab(number, message);
    const has_opened = await hasChatOpened();

    if (!has_opened) {
      // Handle the invalid chat popup if it's displayed
      const invalid_chat_ok_btn = getDocumentElement("invalid_popup_ok_btn");
      if (invalid_chat_ok_btn) {
        invalid_chat_ok_btn.click();
        document.querySelector(".invalid_number_error").style.display = "grid";
        document.querySelector(".currently_sending_number").style.color =
          "#D13B3B";
        await delay(3 * 1000);
      }
    } else {
      await delay(time_gap * 1000);
    }

    return has_opened;
  } catch (e) {
    console.error("ERROR :: openNumber :: ", e);
    trackError("open_number_error", e);
    return false;
  }
}

async function openNumberTab(number, message) {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  const link = `https://api.whatsapp.com/send?phone=${number}${encodedMessage ? `&text=${encodedMessage}` : ""
    }`;

  let linkElement = document.getElementById("whatsapp-message-sender");
  if (!linkElement) {
    linkElement = document.createElement("a");
    linkElement.id = "whatsapp-message-sender";
    document.body.append(linkElement);
  }

  linkElement.setAttribute("href", link);
  linkElement.click();
}

async function hasChatOpened() {
  return new Promise((resolve, reject) => {
    let is_chat_loading = false;
    let wait_time_ms = 0;

    let checkChatOpenedInterval = setInterval(() => {
      wait_time_ms += 100;

      const starting_chat_popup = getDocumentElement("starting_chat_popup");
      const invalid_chat_popup = getDocumentElement("invalid_chat_popup");

      if (starting_chat_popup || wait_time_ms >= 500) {
        is_chat_loading = true;
      }

      if (is_chat_loading) {
        if (invalid_chat_popup || wait_time_ms >= 10000) {
          clearInterval(checkChatOpenedInterval);
          resolve(false);
        } else if (!starting_chat_popup) {
          clearInterval(checkChatOpenedInterval);
          resolve(true);
        }
      }
    }, 100);
  });
}

function getCurrentChatNumber() {
  try {
    // Use current chat number if it's available
    let conversation_message_div = getDocumentElement(
      "conversation_message_div"
    );
    let number = null;
    if (conversation_message_div) {
      let curr_chat_id = conversation_message_div.dataset["id"];
      let chatIdPart = curr_chat_id.split("_")[1] || "";
      let curr_chat_number = chatIdPart
        .replace("@c.us", "")
        .replace("@g.us", "")
        .replace("@lid", "");

      if (curr_chat_number.length > 10) {
        number = curr_chat_number;
      }
    }
    return number;
  } catch (e) {
    console.error("ERROR :: getCurrentChatNumber :: " + e);
    return null;
  }
}

// Pause or Stop Campaign function
function stopCampaign() {
  if (true) { // Always true since all features are free
    stop = true;
    trackButtonClick("stop_campaign_premium");
    cancelDelay();
  } else {
    premium_reminder("stop_campaign", "Premium");
  }

  // update premium usage
  chrome.storage.local.get(["premiumUsageObject"], function (result) {
    if (result.premiumUsageObject !== undefined) {
      let updatedPremiumUsageObject = {
        ...result.premiumUsageObject,
        stop: true,
      };
      chrome.storage.local.set({
        premiumUsageObject: updatedPremiumUsageObject,
      });
    }
  });
  trackButtonClick("stop_campaign");
}

function pauseCampaign() {
  if (true) { // Always true since all features are free
    pause = true;
    trackButtonClick("pause_campaign_premium");
    cancelDelay();
  } else {
    premium_reminder("pause_campaign", "Advance");
  }
  trackButtonClick("pause_campaign");
}

// Customization related function
function isCaptionCustomisation(caption, csv_data) {
  if (csv_data.length == 0) {
    return false;
  }
  const pattern = /\{\{([^}]+)\}\}/g;
  const matches = [];
  let match;

  while ((match = pattern.exec(caption)) !== null) {
    matches.push(match[1].trim());
  }
  for (var j = 0; j < csv_data[0].length; j++) {
    if (!hasLeadingOrTrailingSpaces(csv_data[0][j])) {
      var variable = csv_data[0][j];
    } else {
      var variable = csv_data[0][j].trim();
    }
    if (matches.includes(variable)) {
      return true;
    }
  }
  return false;
}

async function setCaptions(caption, csv_data) {
  let captionArr = Array.isArray(caption) ? caption : [caption];
  let customisedArr = [];
  let customisedCaption;
  for (let i = 0; i < captionArr.length; i++) {
    customisedCaption = await setMessages([captionArr[i]], csv_data, "caption");
    customisedArr.push(customisedCaption);
  }
  let finalArr = transposeArray(customisedArr);
  return finalArr;
}

async function setMessages(message, csv_data, purpose, numbers_length) {
  //start from here
  if (purpose == "text" && csv_data.length == 0) {
    let return_message = [];
    for (let i = 0; i < numbers_length; i++) {
      return_message.push(message);
    }
    return return_message;
  }
  var messages = [];
  for (var i = 1; i < csv_data.length; i++) {
    if (purpose == "caption") {
      var temp_message = message[0];
    } else {
      var temp_message = message;
    }
    for (var j = 0; j < csv_data[0].length; j++) {
      if (!hasLeadingOrTrailingSpaces(csv_data[0][j])) {
        var variable = csv_data[0][j];
      } else {
        var variable = csv_data[0][j].trim();
      }
      var curr_text = csv_data[i][j];
      if (temp_message.includes("{{" + variable + "}}"))
        temp_message = temp_message.replaceAll(
          "{{" + variable + "}}",
          curr_text
        );
    }
    messages.push(temp_message);
  }
  return messages;
}

// Messenger related popup's handling functions
async function messanger_popup() {
  var messanger_popup_div =
    document.getElementsByClassName("messanger_popup")[0];
  if (!messanger_popup_div) {
    // ultimate div
    var popup = document.createElement("div");
    popup.className = "messanger_popup";

    // message sending div
    var sendingMessageDiv = document.createElement("div");
    sendingMessageDiv.className = "message_being_sent";

    var campaignDiv = document.createElement("div");
    campaignDiv.className = "did_you_know";
    var campaignHelpLogo = document.createElement("img");
    campaignHelpLogo.className = "campaign_help_logo";
    campaignHelpLogo.src = pro_help_icon_src;
    campaignDiv.appendChild(campaignHelpLogo);

    var modal_content = document.createElement("div");
    modal_content.className = "messanger_popup_content";

    sendingMessageDiv.appendChild(modal_content);

    modal_content.appendChild(
      $(
        $.parseHTML(
          `<div class="popup_text_title"><img style="width: 25px; height: 25px;" src=${pro_email_icon_src}></img><p id="message_sending_popup_title" style="margin-left: 15px; font-weight: 700; font-size: 16px; line-height: 20.7px; align-items: center; ">Your messages are being sent</p></div>`
        )
      )[0]
    );
    modal_content.appendChild(
      $(
        $.parseHTML(
          `<div class="messanger_time_bar_outline"><div class="messanger_time_bar" ></div></div>`
        )
      )[0]
    );
    modal_content.appendChild(
      $($.parseHTML(`<div class="messanger_sending"></div>`))[0]
    );

    let campaignButtons = document.createElement("div");
    campaignButtons.className = "campaign_buttons";

    campaignButtons.innerHTML = `
            <div class="pause_campaign_button CtaBtn">
                <div class="pause_campaign_image">
                    <img src=${pro_pause_icon_src} alt="" />
                </div>
                <p class="text">Pause Campaign</p>
            </div>
            <div class="stop_campaign_button CtaBtn">
                <div class="circle"></div><p class="text">Stop Campaign</p>
            </div>
        `;
    modal_content.appendChild(campaignButtons);

    if (false) { // Never show premium restrictions since all features are free
      let {
        name: country_name,
        name_code: country_code,
        currency: country_currency,
      } = location_info;
      if (Object.keys(COUNTRY_WITH_SPECIFIC_PRICING).includes(country_code))
        country_name = COUNTRY_WITH_SPECIFIC_PRICING[country_code];
      else country_name = "international";
      let pricingButtonLink = "https://prosender.tech/pricing";
      const my_number = chrome.storage.local.get(["my_number"])
      if (last_plan_type == "Basic") {
        pricing_link = `https://prosender.tech/checkout/?country=${country_name}&lastPlan=lastPlan&currentPlan=basic&phone=${my_number}`;
      } else if (last_plan_type == "Advance") {
        pricing_link = `https://prosender.tech/checkout/?country=${country_name}&lastPlan=lastPlan&currentPlan=advance&phone=${my_number}`;
      }
      let timeGapReminderDiv = document.createElement("div");
      timeGapReminderDiv.className = "time_gap_reminder_div";
      timeGapReminderDiv.innerHTML = `<div class="circle">30</div><p class="text" id="time_gap_reminder_text">Time Gap between messages is 30 sec. Purchase <a href="${pricingButtonLink}" target="_blank" class="styled_text"> Premium </a> to reduce time gap between messages.</p>`;
      modal_content.appendChild(timeGapReminderDiv);
    }

    popup.appendChild(sendingMessageDiv);
    popup.appendChild(campaignDiv);

    var body = document.querySelector("body");
    body.appendChild(popup);
    modal_content.appendChild(
      $(
        $.parseHTML(
          '<span id="close_edit1" style="position: absolute;top: 12px;right: 12px;font-size: 20px;width:14px"><img class="CtaCloseBtn" src="' +
          pro_close_img_src +
          '" style="width: 100%;" alt="x"></span>'
        )
      )[0]
    );
    document
      .getElementById("close_edit1")
      .addEventListener("click", function (event) {
        document.getElementsByClassName("messanger_popup")[0].style.display =
          "none";
      });
    document
      .querySelector(".stop_campaign_button")
      .addEventListener("click", stopCampaign);
    document
      .querySelector(".pause_campaign_button")
      ?.addEventListener("click", pauseCampaign);
    loadTips();
  } else messanger_popup_div.style.display = "block";

  document.getElementById("message_sending_popup_title").innerText =
    await translate("Your messages are being sent");
}

async function updateMessengerProgressBar(
  sending_to,
  index,
  total_numbers,
  remaining_time,
  total_time
) {
  let messanger_sending =
    document.getElementsByClassName("messanger_sending")[0];
  if (messanger_sending) {
    messanger_sending.innerHTML = "";

    let currently_sending_to_html = `<div style="margin: auto;display: flex; width: 100%; align-items: center; justify-content: center; font-weight: 400; font-size: 12px; line-height: 15.53px">Currently sending to :  <strong style="padding: 0px 12px;" class="currently_sending_number">${sending_to}</strong>  ( ${index + 1
      } of ${total_numbers} )</div>`;
    let invalid_number_error_html = `<div class="invalid_number_error" style="display: none;"><img src=${pro_error_icon_src} style="width: 17px; height: 17px"/><p class="text"><span style="font-weight: 700;">Invalid number</span> : <span>${await translate(
      "Please check the delivery report after the campaign ends."
    )}</span></p></div>`;

    messanger_sending.appendChild($($.parseHTML(currently_sending_to_html))[0]);
    messanger_sending.appendChild($($.parseHTML(invalid_number_error_html))[0]);
  }

  let messanger_time_bar =
    document.getElementsByClassName("messanger_time_bar")[0];
  if (messanger_time_bar) {
    messanger_time_bar.innerHTML = "";
    let remaining_bar =
      index == 0 ? 0 : (1 - remaining_time / total_time) * 100;
    let hours = Math.floor(remaining_time / 3600);
    let mins = Math.ceil(remaining_time / 60) % 60;
    let remaining_time_str =
      "Approx. " +
      (hours > 0 ? hours + (hours > 1 ? " hours " : " hour ") : "") +
      mins +
      (mins > 1 ? " minutes " : " minute ") +
      "remaining";

    let remaining_time_text_html = `<div style="width: 400px;color: #fff;position: absolute;text-align: center;font-weight: normal;font-size: 12px;padding: 4px;">${remaining_time_str}</div>`;
    let remaining_time_bar_html = `<div style="width: ${remaining_bar}%;background: #357A71;height: 100%;border-radius: 16px;"></div>`;
    messanger_time_bar.appendChild($($.parseHTML(remaining_time_text_html))[0]);
    messanger_time_bar.appendChild($($.parseHTML(remaining_time_bar_html))[0]);
  }
}

function loadTips() {
  chrome.storage.local.get(["ptc852"], async (res) => {
    let ptc852 = res.ptc852;
    let tip_title = await translate("Did you know?");
    let tip_content = await translate(DID_YOU_KNOW_TIPS[ptc852]);
    let msgNew = document.createElement("div");
    msgNew.style.color = "#fff";
    msgNew.innerHTML = `<strong class='did_you_know_text' style='color: #fff;'>${tip_title}</strong><span>${tip_content}</span>`;
    msgNew.className = "messanger_popup_tips";
    document.querySelector(".did_you_know").appendChild(msgNew);
  });
}

let tipsIntervalID = "";
function checkTipsInterval() {
  clearInterval(tipsIntervalID);
  if (tipsIntervalID == "") {
    updateTipsCount();
  }
}

function updateTipsCount() {
  tipsIntervalID = setInterval(() => {
    chrome.storage.local.get(["ptc852"], async (response) => {
      let ptc852 = (response.ptc852 + 1) % 6;
      let messanger_display = document.querySelector(".messanger_popup");
      if (messanger_display && messanger_display.style.display != "none") {
        let tip_title = await translate("Did you know?");
        let tip_content = await translate(DID_YOU_KNOW_TIPS[ptc852]);
        let msgNew = document.querySelector(".messanger_popup_tips");

        msgNew.innerHTML = `<strong class='did_you_know_text' style='color: #fff;'>${tip_title}</strong><span>${tip_content}</span>`;
        chrome.storage.local.set({ ptc852: ptc852 });
      }
    });
  }, 15000);
}

async function updateDeliveryReports(numbers, message, curr_report, pause) {
  console.log("Delivery Reports: updateDeliveryReports called with:", {
    numbersCount: numbers.length,
    message: message.substring(0, 50) + "...",
    pause: pause
  });

  let [reports, campaigns, templates] = await new Promise((resolve) => {
    chrome.storage.local.get(
      ["deliveryReports", "campaigns", "templates"],
      (res) => {
        let reports = res.deliveryReports || [];
        let campaigns = res.campaigns || [];
        let templates = res.templates || [];
        console.log("Delivery Reports: Retrieved from storage:", {
          reportsCount: reports.length,
          campaignsCount: campaigns.length,
          templatesCount: templates.length
        });
        resolve([reports, campaigns, templates]);
      }
    );
  });
  // Max 10 Reports
  if (reports.length >= 10) reports.shift(1);

  let [campaign_name, template_name] = await new Promise((resolve) => {
    let campName = null,
      tempName = null;
    let numbers_str = numbers.join(",");
    campaigns.forEach((campaign) => {
      if (campaign.numbers == numbers_str) {
        campName = campaign.name;
      }
    });
    templates.forEach((template) => {
      if (template.message == message) {
        tempName = template.name;
      }
    });
    resolve([campName, tempName]);
  });

  let { rows, start_time, campaign_type, sent_count, total_time, time_gap, custom_time_range } =
    curr_report;
  const is_custom_range = custom_time_range && custom_time_range.from && custom_time_range.to;
  let {
    msg_for_popup,
    msg_for_report: time_saved_msg,
    time_saved,
  } = calc_time_saved(numbers.length, time_gap, is_custom_range);
  let last_run_str = new Date(start_time)
    .toLocaleString("en-IN")
    .replace(",", " ");
  let report_side_info = [
    ["Last Run", last_run_str.toLocaleUpperCase()],
    ["Campaign Name", campaign_name || "Campaign " + (reports.length + 1)],
    ["Campaign Type", campaign_type],
    ["Template Name", template_name || "-"],
    ["Overall Report", `${sent_count} sent out of ${numbers.length}`],
    [time_saved_msg, time_saved],
  ];

  let empty_cols = Array(rows[0].length).fill("");
  let report_length = rows.length;
  for (let i = 0; i < report_side_info.length; i++) {
    let side_info_arr = ["", "", ...report_side_info[i]];
    if (i < report_length) {
      rows[i].push(...side_info_arr);
    } else {
      rows.push([...empty_cols, ...side_info_arr]);
    }
  }

  let csv_data =
    "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
  reports.push({
    name: campaign_name,
    date: start_time,
    data: csv_data,
  });

  console.log("Delivery Reports: Saving reports to storage. New reports count:", reports.length);
  await chrome.storage.local.set({ deliveryReports: reports });
  console.log("Delivery Reports: Reports saved to storage");

  // Update Monthly Stats for Reports Tab
  chrome.storage.local.get(["reports_stats"], function (result) {
    const currentMonth = new Date().getMonth();
    let stats = result.reports_stats || {
      sent: 0,
      success: 0,
      failed: 0,
      month: currentMonth
    };

    console.log("Delivery Reports: Current stats before update:", stats);

    // Reset stats if month changed
    if (stats.month !== currentMonth) {
      console.log("Delivery Reports: Month changed, resetting stats");
      stats = {
        sent: 0,
        success: 0,
        failed: 0,
        month: currentMonth
      };
    }

    const campaign_total = numbers.length;
    const campaign_success = curr_report.sent_count || 0;
    const campaign_failed = Math.max(0, campaign_total - campaign_success);

    stats.sent += campaign_total;
    stats.success += campaign_success;
    stats.failed += campaign_failed;

    console.log("Delivery Reports: Updated stats:", {
      campaign_total,
      campaign_success,
      campaign_failed,
      newStats: {
        sent: stats.sent,
        success: stats.success,
        failed: stats.failed
      }
    });

    // Track Failed Numbers for Reports
    chrome.storage.local.get(["failedNumbers"], function (res) {
      let failedLog = res.failedNumbers || [];
      const now = new Date().getTime();

      rows.forEach(row => {
        // row: [target, msg_sent, attach_sent, comments, error]
        const comments = row[3] || "";
        const error = row[4] || "";

        // If message or attachments were not sent and it's not a "-" placeholder
        // OR if comments explicitly mention Invalid Number
        if ((row[1] === "NO" || row[2] === "NO") || (comments.includes("Invalid Number"))) {
          const number = String(row[0]).replace(/\D/g, "");
          if (number && !failedLog.find(f => f.number === number)) {
            failedLog.push({
              number: number,
              reason: comments || error || "Unknown failure",
              timestamp: now
            });
          }
        }
      });
      // Keep only last 1000 failed numbers to prevent storage bloat
      if (failedLog.length > 1000) failedLog = failedLog.slice(-1000);
      chrome.storage.local.set({ failedNumbers: failedLog });
    });

    console.log("Delivery Reports: Final stats being saved:", stats);
    chrome.storage.local.set({ reports_stats: stats });
    console.log("Delivery Reports: Stats saved to storage");
  });

  handleAutodownloadCampaignReport(reports);
  campaign_end_popup(
    reports,
    sent_count,
    numbers.length,
    total_time,
    time_gap,
    pause,
    custom_time_range
  );
}

async function campaign_end_popup(
  reports,
  sent_count,
  total_numbers,
  total_time_taken,
  time_gap,
  isPaused,
  custom_time_range
) {
  total_time_taken = Math.ceil(total_time_taken / 60);
  let last_report = reports[reports.length - 1];
  const is_custom_range = custom_time_range && custom_time_range.from && custom_time_range.to;
  let { msg_for_popup, msg_for_report, time_saved } = calc_time_saved(
    total_numbers,
    time_gap,
    is_custom_range
  );

  // Last Report Name and URI
  let reportDataURI = encodeURI(last_report.data);
  let reportDownloadDate = getReportDateFormat(last_report.date, true);
  let reportName = last_report.name || "Campaign " + reports.length;
  let reportDownloadName = `${reportName} ${reportDownloadDate}.csv`;

  const messageSentDiv = `
    <div class='message_send_div'>
        <div class='message_send_text' style='color: #fff'>
            <img style='width: 50px; height: 50px' src=${pro_read_icon_src}></img>
            <p style='font-weight: 700; font-size: 20px; line-height: 25.88px'>
                ${await translate("Your campaign is completed")}
            </p>
        </div>
        <span id="report_download_edit" style="position: absolute;top: 12px;right: 12px;font-size: 20px;width:14px; z-index: 1000"><img class="CtaCloseBtn" src=${pro_close_img_src} style="width: 100%;" alt="x"></span>
    </div>
    <div class='campaign_info_div'>
        <div style='display: flex; margin: 0 auto'>
            <div class='campaign_info'>
                <div class='campaign_info_text'>
                    <p><span class='campaign_name'>Campaign ${reports.length
    }</span> : Sent to <span class='numbers_message_sent_to num_of_numbers'>${sent_count}</span> numbers out of ${" "} <span class='total_numbers num_of_numbers'>${total_numbers}</span></p>
                    <p>${await translate(
      "Approximate time taken"
    )} : <span class='approx_time num_of_numbers'>${total_time_taken}</span> ${total_time_taken > 1 ? "minutes" : "minute"
    }</p>
                </div>
                <div class='download_campaign_report'>
                    <p>${await translate(
      "Check our new delivery report"
    )} : ${" "}</p>
                    <a class='download_report_button CtaBtn' href=${reportDataURI} download="${reportDownloadName}">
                        Download Delivery Report
                    </a>
                </div>
            </div>
            <div class='time_saved_div'>
                <div class='time_saved_circle'>
                    <p class='time_saved'>${time_saved}</p>
                    <p class='time_saved_text' style='text-align: center'>
                        ${await translate(msg_for_popup)}
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;

  const popup = document.createElement("div");
  popup.className = "campaign-end trial_popup";
  popup.innerHTML = messageSentDiv;
  document.body.appendChild(popup);

  // adding google analytics
  document
    .querySelector(".download_report_button")
    .addEventListener("click", () => {
      trackButtonClick("download_delivery_report_campaign_end");
    });

  const closeButton = document.getElementById("report_download_edit");
  closeButton.addEventListener("click", () => {
    document.querySelector(".campaign-end").remove();
    trackCloseButtonClick("campaign_end_popup_close");
  });

  chrome.storage.local.get(["campaignNumber"], function (res) {
    if (
      res.campaignNumber == null ||
      res.campaignNumber == undefined ||
      !res.campaignNumber
    ) {
      chrome.storage.local.set({ campaignNumber: 1 });
    } else {
      chrome.storage.local.set({ campaignNumber: res.campaignNumber + 1 });
    }
  });

  if (isPaused) {
    reports.pop();
    chrome.storage.local.set({ deliveryReports: reports });
  }
  trackButtonView("campaign_end_popup");
}

// getting date format for the delivery report
function getReportDateFormat(date_ms, isDownloadName = false) {
  const today = new Date();
  const reportDate = new Date(date_ms);
  const diffDays = Math.round(
    Math.abs((today - reportDate) / (24 * 60 * 60 * 1000))
  );

  const reportDay = reportDate.getDate();
  const dayString = reportDay + getDaySuffix(reportDay);

  let reportTimeString = reportDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  let reportDateString;

  if (isDownloadName || diffDays > 1) {
    reportDateString = `${dayString} ${reportDate.toLocaleDateString("en-US", {
      month: "short",
    })}`;
  } else if (diffDays === 0) {
    reportDateString = "Today";
  } else if (diffDays === 1) {
    reportDateString = "Yesterday";
  }

  if (isDownloadName) {
    return `(Last Run at ${reportDateString} ${reportTimeString})`;
  }
  return `(Last Run: ${reportDateString} ${reportTimeString})`;
}

// Calculate the total time saved or could have been saved
function calc_time_saved(total_numbers, time_gap, is_custom_range = false) {
  let msg_for_popup, msg_for_report, diff;

  if (true) { // Always true since all features are free
    if (time_gap >= 30) {
      msg_for_popup = is_custom_range ? "could have been saved with custom range" : "could have been saved";
      msg_for_report = is_custom_range ? "Time that could have been saved with custom range" : "Time that could have been saved";
      diff = (time_gap - 1) * total_numbers;
    } else {
      msg_for_popup = is_custom_range ? "saved with custom range" : "Fast SMS Send For Smart WA Sender Pro";
      msg_for_report = is_custom_range ? "Time saved with custom range" : "Time saved with Fast SMS Send For Smart WA Sender Pro";
      diff = (30 - time_gap) * total_numbers;
    }
  } else {
    msg_for_popup = "could have been saved with Fast SMS Send For Smart WA Sender Pro";
    msg_for_report = "Time that could have been saved with Fast SMS Send For Smart WA Sender Pro";
    diff = (30 - 1) * total_numbers;
  }

  let hours = Math.floor(diff / 3600);
  let minutes = Math.floor(diff / 60 - hours * 60);
  let seconds = diff - hours * 3600 - minutes * 60;

  let time_saved = "";
  if (hours && minutes) {
    time_saved = `${hours} hrs ${minutes} min`;
  } else {
    if (hours) time_saved += `${hours} hrs `;
    if (minutes) time_saved += `${minutes} min `;
    if (seconds) time_saved += `${seconds} sec`;
  }

  return { msg_for_popup, msg_for_report, time_saved };
}

// Scheduled Campaigns
async function handleScheduleCampaigns() {
  chrome.storage.local.get(["scheduled_campaigns"], async function (result) {
    let scheduled_campaigns = result.scheduled_campaigns || [];
    for (let i = 0; i < scheduled_campaigns.length; i++) {
      let isScheduledWithin24Hours = false;
      let scheduled_date = scheduled_campaigns[i].schedule_date;
      let scheduled_time = scheduled_campaigns[i].schedule_time;
      isScheduledWithin24Hours = isWithin24Hours(
        scheduled_date,
        scheduled_time
      );

      if (
        scheduled_campaigns[i].hasBeenScheduled == true ||
        !isScheduledWithin24Hours
      ) {
        continue;
      }
      let {
        numbers,
        groups,
        message,
        time_gap,
        csv_data,
        customization,
        schedule_time,
        random_delay,
        batch_size,
        batch_gap,
        caption,
        send_attachment_first,
        caption_customization,
        attachmentsData,
        custom_time_range,
      } = scheduled_campaigns[i];
      const timeOutId = await schedule_message(
        numbers,
        groups,
        message,
        time_gap,
        csv_data,
        customization,
        caption_customization,
        schedule_time,
        random_delay,
        batch_size,
        batch_gap,
        caption,
        send_attachment_first,
        attachmentsData,
        custom_time_range
      );
      scheduled_campaigns[i].hasBeenScheduled = true;
      scheduled_campaigns[i].timeOutId = timeOutId;
    }
    chrome.storage.local.set({ scheduled_campaigns: scheduled_campaigns });
  });
}

async function schedule_message(
  numbers,
  groups,
  message,
  time_gap,
  csv_data,
  customization,
  caption_customization,
  schedule_time,
  random_delay,
  batch_size,
  batch_gap,
  caption,
  send_attachment_first,
  attachmentsData,
  custom_time_range = null
) {
  var stime = schedule_time.split(":");
  var time12 =
    (stime[0] % 12).toString() + ":" + stime[1] + (stime[0] < 12 ? "AM" : "PM");

  // Send notification
  chrome.runtime.sendMessage({
    type: "pro_send_notification",
    title: "Your campaign has been scheduled for " + time12,
    message: "Open the extension to view all scheduled campaigns.",
  });

  var ctime = new Date();
  var interval_time =
    ((Number(stime[0]) - ctime.getHours()) * 60 +
      (Number(stime[1]) - ctime.getMinutes()) +
      1440) %
    1440;
  const timeOutId = setTimeout(() => {
    chrome.storage.local.get(["scheduled_campaigns"], async function (result) {
      let scheduled_campaigns = result.scheduled_campaigns || [];
      if (scheduled_campaigns.length > 0) scheduled_campaigns.shift();
      chrome.storage.local.set({ scheduled_campaigns: scheduled_campaigns });
    });
    // pass the groups instead of numbers
    if (numbers == null || numbers == undefined || numbers.length == 0)
      messenger(
        groups,
        message,
        time_gap,
        csv_data,
        customization,
        caption_customization,
        random_delay,
        batch_size,
        batch_gap,
        caption,
        send_attachment_first,
        "Scheduled_group",
        null,
        null,
        null,
        attachmentsData,
        custom_time_range
      );
    else
      messenger(
        numbers,
        message,
        time_gap,
        csv_data,
        customization,
        caption_customization,
        random_delay,
        batch_size,
        batch_gap,
        caption,
        send_attachment_first,
        "Scheduled_number",
        null,
        null,
        null,
        attachmentsData,
        custom_time_range
      );
  }, interval_time * 60000);

  return timeOutId;
}

// ===== Utility functions =====

// Messenger related utilities
function initializeReport(campaign_type, paused_report_rows) {
  let report_header = campaign_type.includes("group")
    ? [
      "Group Name",
      "Text Delivered?",
      "All Attachments Delivered?",
      "Comments",
      "Error",
    ]
    : [
      "Phone Number",
      "Text Delivered?",
      "All Attachments Delivered?",
      "Comments",
      "Error",
    ];
  return paused_report_rows || [report_header];
}

function getTimeGap(index, batch_size, time_gap, random_delay, batch_gap, custom_range = null) {
  if (index == 0) return 1;
  if (batch_size && index % batch_size == 0) return batch_gap;
  if (random_delay) {
    if (custom_range && custom_range.from && custom_range.to) {
      return getRandomNumber(custom_range.from, custom_range.to);
    }
    return getRandomNumber(3, 10);
  }
  return time_gap;
}

async function getAttachmentsData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["attachmentsData"], (res) => {
      resolve(res.attachmentsData || []);
    });
  });
}

async function saveCampaignState(
  index,
  paused,
  campaign_data,
  report_rows,
  sent_count
) {
  const attachments = await getAttachmentsData();
  const pausedCampaignData = {
    paused: paused,
    index: index,
    campaignData: campaign_data,
    attachmentsData: attachments,
    report_rows: report_rows,
    send_count: sent_count,
  };
  chrome.storage.local.set({ pausedCampaign: pausedCampaignData });
}

// Other utilities
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function isWithin24Hours(date, time) {
  let dateTime = new Date(date + "T" + time);
  let now = new Date();
  let diffMs = Math.abs(now - dateTime);
  let diffHours = diffMs / (1000 * 60 * 60);
  return diffHours < 24;
}

function hasLeadingOrTrailingSpaces(inputString) {
  // Use a regular expression to check for leading or trailing white spaces
  const regex = /^\s+|\s+$/g;

  // Test the input string against the regular expression
  return regex.test(inputString);
}

function triggerEscape() {
  var event = new KeyboardEvent("keydown", {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27,
  });
  document.dispatchEvent(event);
}

function transposeArray(arr) {
  const numRows = arr[0].length;
  const numCols = arr.length;
  const transposedArray = [];
  for (let i = 0; i < numRows; i++) {
    const newRow = [];
    for (let j = 0; j < numCols; j++) {
      newRow.push(arr[j][i]);
    }
    transposedArray.push(newRow);
  }
  return transposedArray;
}
