import './style.css';
import { account } from './appwrite';

const loginGoogleBtn = document.getElementById('login-google-btn');
const loginGitHubBtn = document.getElementById('login-github-btn');
const logoutBtn = document.getElementById('logout-btn');
const profileScreen = document.getElementById('profile-screen');
const loginScreen = document.getElementById('login-screen');

async function handleGoogleLogin() {
    try {
        await account.createOAuth2Session('google', 'http://localhost:5173/', 'http://localhost:5173/fail');
    } catch (error) {
        console.error("Google login failed", error);
    }
}

async function handleGitHubLogin() {
    try {
        await account.createOAuth2Session('github', 'http://localhost:5173/', 'http://localhost:5173/fail');
    } catch (error) {
        console.error("GitHub login failed", error);
    }
}

async function getUser() {
    try {
        const user = await account.get();
        renderProfileScreen(user);
    } catch (error) {
        renderLoginScreen();
    }
}

function renderLoginScreen() {
    loginScreen.classList.remove('hidden');
    profileScreen.classList.add('hidden');
}

function renderProfileScreen(user) {
    document.getElementById('user-name').textContent = user.name;
    loginScreen.classList.add('hidden');
    profileScreen.classList.remove('hidden');
}

async function handleLogout() {
    await account.deleteSession('current');
    profileScreen.classList.add('hidden');
    renderLoginScreen();
}

loginGoogleBtn.addEventListener('click', handleGoogleLogin);
loginGitHubBtn.addEventListener('click', handleGitHubLogin);
logoutBtn.addEventListener('click', handleLogout);

getUser();
