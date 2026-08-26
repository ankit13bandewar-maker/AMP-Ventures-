import os
import sys
import urllib.request
import zipfile

MINGIT_URL = "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/MinGit-2.48.1-64-bit.zip"
TARGET_DIR = os.path.expanduser(r"~\.local\mingit")
ZIP_PATH = os.path.expanduser(r"~\.local\mingit.zip")

os.makedirs(TARGET_DIR, exist_ok=True)

git_exe = os.path.join(TARGET_DIR, "cmd", "git.exe")
if os.path.exists(git_exe):
    print(f"MinGit already present at: {git_exe}")
    sys.exit(0)

print(f"Downloading MinGit from {MINGIT_URL}...")
urllib.request.urlretrieve(MINGIT_URL, ZIP_PATH)
print("Extracting MinGit...")
with zipfile.ZipFile(ZIP_PATH, 'r') as zip_ref:
    zip_ref.extractall(TARGET_DIR)

if os.path.exists(ZIP_PATH):
    os.remove(ZIP_PATH)

print(f"Successfully installed MinGit to: {git_exe}")
