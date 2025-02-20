# Free Auto Follow for Instagram Browser Extension

## 🚀 Overview
This open-source browser extension automates the process of following users on Instagram. It navigates to the [Instagram Explore People](https://www.instagram.com/explore/people/) page, detects users who haven't been followed yet, and sequentially clicks the 'Follow' button for 10 users at a time. Once all users on the page are followed, the extension refreshes the page to fetch a new list of users.

## ✨ Features
- Automatically navigates to the Instagram Explore People page.
- Clicks on 'Follow' buttons for 10 users at a time.
- Continues the process until all users on the page are followed.
- Displays a message when all users have been followed.
- Refreshes the page to load a new list of users.

## 🛠️ Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/mesepith/insta-reach.git
   cd insta-reach
   ```
2. Open **Google Chrome** and navigate to:
   ```sh
   chrome://extensions/
   ```
3. Enable **Developer mode** (toggle in the top right corner).
4. Click **Load unpacked** and select the cloned project folder.
5. The extension is now installed and ready to use.

## 🔧 How to Use
1. Open Instagram and log into your account.
2. Open the extension.
3. Click the **Follow** button in the extension.
4. The extension will begin following users in batches of 10.
5. Once all users on the page are followed, a message will appear: _"You have followed everyone on this page. Refreshing the page..."_
6. The page will refresh automatically to load a new set of users.
7. Repeat the process until you're done!

## 🛑 Limitations & Considerations
- Instagram may impose follow limits per hour/day. Use the extension cautiously to avoid temporary restrictions.
- Instagram's UI may change over time, which could break the extension. Contributions are welcome to keep it updated!
- This extension is intended for personal use only. Avoid violating Instagram's policies.

## 📌 Roadmap
- [ ] Add a delay between follows to mimic human behavior.
- [ ] Implement error handling for blocked actions.
- [ ] Support for different languages in the extension UI.
- [ ] Add an option to set a custom follow limit per session.

## 🏗️ Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Added a new feature"`
4. Push the changes: `git push origin feature-name`
5. Open a Pull Request!

## 💡 Acknowledgments
Special thanks to the open-source community for inspiring this project!

---

💻 **Created by [Zahir Alam](https://github.com/mesepith)** – Feel free to reach out or star the repo if you found it useful! 🌟
