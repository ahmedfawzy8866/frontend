const testPayload = {
  rows: [
    {
      Mobile: "01061399688",
      Location: "New Cairo",
      RentPeriodType: "180",
      Code: "SBR-TEST-100",
      Owner: "Ahmed Fawzy Test",
      Furniture: "Fully Finished with Furniture",
      UnitPrice: "15000000",
      Availability: "RESALE",
      BedRooms: "3",
      Name: "Luxury Villa"
    }
  ]
};

async function testPF() {
  console.log("Starting Property Finder Webhook Test...");
  try {
    const res = await fetch("http://localhost:3000/api/crm/property-finder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SBR-SECRET-KEY": "sierra-secure-2028"
      },
      body: JSON.stringify(testPayload)
    });

    const data = await res.json();
    console.log("Response Status:", res.status);
    console.log("Response Data:", data);
  } catch (error) {
    console.error("Test Failed:", error);
  }
}

testPF();
