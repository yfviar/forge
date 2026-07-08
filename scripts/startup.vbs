Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "forge start -d --dashboard --port 3141 --shell powershell", 0, False
