import json
import os
import requests
from pathlib import Path
from urllib.parse import urlparse
import time

# Image URLs that have CORS issues and need to be downloaded
PROBLEMATIC_DOMAINS = [
    'tusas.com',
    'savunmasanayist.com',
    'tolgaozbek.com',
    'ukdj.imgix.net',
    'trthaberstatic.cdn.wp.trt.com.tr',
    'cdn.turkiyeyuzyili.com',
    'baykartech.com',
    'defensenews.com',
    'cdnuploads.aa.com.tr',
    'mavivatan.net',
    'navalnews.com'
]

def should_download(url):
    """Check if URL is from a domain that needs downloading"""
    return any(domain in url for domain in PROBLEMATIC_DOMAINS)

def sanitize_filename(filename):
    """Remove/replace invalid characters from filename"""
    invalid_chars = '<>:"|?*,'
    for char in invalid_chars:
        filename = filename.replace(char, '_')
    return filename

def get_file_extension(url):
    """Extract file extension from URL"""
    parsed = urlparse(url)
    path = parsed.path
    if '.' in path:
        return path.split('.')[-1].split('?')[0].split('#')[0]
    return 'jpg'  # default to jpg

def download_image(url, output_dir, project_name):
    """Download image and return local path or None if failed"""
    try:
        # Create sanitized filename
        filename = sanitize_filename(project_name.replace(' ', '_'))
        ext = get_file_extension(url)
        filepath = f"{filename}.{ext}"
        
        full_path = os.path.join(output_dir, filepath)
        
        # Skip if already downloaded
        if os.path.exists(full_path):
            print(f"✓ Already exists: {filepath}")
            return f"/images/{filepath}"
        
        # Download with timeout and headers
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        print(f"⬇ Downloading: {project_name}...")
        response = requests.get(url, timeout=10, headers=headers, stream=True)
        response.raise_for_status()
        
        # Save image
        with open(full_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✓ Downloaded: {filepath}")
        return f"/images/{filepath}"
        
    except Exception as e:
        print(f"✗ Failed to download {project_name}: {str(e)}")
        return None

def main():
    # Create images directory
    images_dir = "public/images"
    os.makedirs(images_dir, exist_ok=True)
    
    # Load projects.json
    with open('src/data/projects.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Track updates
    updates = []
    
    # Process each project
    for project in data['projects']:
        image_url = project.get('image_url', '')
        project_name = project.get('project_name', 'unknown')
        
        if should_download(image_url):
            print(f"\n📦 Processing: {project_name}")
            local_path = download_image(image_url, images_dir, project_name)
            
            if local_path:
                updates.append({
                    'id': project['id'],
                    'old_url': image_url,
                    'new_url': local_path,
                    'project_name': project_name
                })
                project['image_url'] = local_path
            
            time.sleep(0.5)  # Be nice to servers
    
    # Save updated projects.json
    if updates:
        with open('src/data/projects.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Success! Updated {len(updates)} projects:")
        print("=" * 60)
        for update in updates:
            print(f"  • {update['project_name']}")
            print(f"    {update['old_url'][:60]}...")
            print(f"    → {update['new_url']}")
        print("=" * 60)
    else:
        print("\n✓ No images needed downloading")

if __name__ == '__main__':
    main()
