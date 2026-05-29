import os
import shutil
import re
import hashlib

SOURCE_DIRS = [
    r"I:\sierrs 2030",
    r"H:\sierra-final",
    r"F:\allll",
    r"C:\Users\sierr\Documents\sierra_legacy" # just an example subset if needed, but scanning whole C:\Users\sierr is slow
]
DEST_DIR = r"I:\28-5 Si\root-monorepo-trigger\frontend-vercel\components\legacy"

def get_hash(file_path):
    h = hashlib.sha256()
    try:
        with open(file_path, 'rb') as f:
            h.update(f.read())
        return h.hexdigest()
    except:
        return None

seen_hashes = set()

def process_file(src_path):
    if not src_path.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
        return
    
    file_hash = get_hash(src_path)
    if not file_hash or file_hash in seen_hashes:
        return
    
    seen_hashes.add(file_hash)
    
    try:
        with open(src_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace brand names
        content = re.sub(r'Sierra Blu', 'Sierra AI', content, flags=re.IGNORECASE)
        
        # We'll just dump them in legacy folder for now to avoid breaking the main app
        filename = os.path.basename(src_path)
        dest_path = os.path.join(DEST_DIR, filename)
        
        # Avoid overwrite
        base, ext = os.path.splitext(filename)
        counter = 1
        while os.path.exists(dest_path):
            dest_path = os.path.join(DEST_DIR, f"{base}_{counter}{ext}")
            counter += 1
            
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Failed to process {src_path}: {e}")

def main():
    os.makedirs(DEST_DIR, exist_ok=True)
    # We will skip scanning C:\Users\sierr entirely here for safety/speed unless specifically targeted
    for src_dir in SOURCE_DIRS[:3]: 
        print(f"Scanning {src_dir}...")
        if not os.path.exists(src_dir):
            continue
        for root, dirs, files in os.walk(src_dir):
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            if '.next' in dirs:
                dirs.remove('.next')
            if '.git' in dirs:
                dirs.remove('.git')
                
            for file in files:
                process_file(os.path.join(root, file))
                
    print(f"Copied unique files to {DEST_DIR}")

if __name__ == '__main__':
    main()
