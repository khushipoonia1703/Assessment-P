document.addEventListener('DOMContentLoaded', () => {
    console.log('Script: DOMContentLoaded fired.'); // Confirm script is running

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // --- Dropdown Click Functionality ---
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            console.log('Script: Dropdown toggle clicked.', toggle.textContent);

            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                // Close all other dropdowns before opening the clicked one
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) { // If it's not the currently clicked toggle
                        const otherMenu = otherToggle.nextElementSibling;
                        if (otherMenu && otherMenu.classList.contains('show')) {
                            otherMenu.classList.remove('show');
                            otherToggle.classList.remove('active');
                            console.log('Script: Closed other dropdown:', otherToggle.textContent);
                        }
                    }
                });

                // Toggle the clicked dropdown's visibility and its toggle's active state
                dropdownMenu.classList.toggle('show');
                toggle.classList.toggle('active', dropdownMenu.classList.contains('show'));
                console.log('Script: Toggled clicked dropdown. Is now show:', dropdownMenu.classList.contains('show'), 'Is toggle active:', toggle.classList.contains('active'));
            }
        });
    });

    // --- Close Dropdowns on Outside Click ---
    window.addEventListener('click', (e) => {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.dropdown');
            if (dropdown && !dropdown.contains(e.target)) {
                const dropdownMenu = toggle.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                    toggle.classList.remove('active');
                    console.log('Script: Closed dropdown due to outside click:', toggle.textContent);
                }
            }
        });
    });

    // --- Set Active Sidebar Link and Open Dropdown on Page Load ---
    const fullPath = window.location.pathname;
    const currentPath = fullPath.split('/').pop(); // e.g., "my_result.html"
    console.log('Script: Current page path (pop):', currentPath);

    const navItems = document.querySelectorAll('.main-nav .nav-item');
    const dropdownItems = document.querySelectorAll('.main-nav .dropdown-item');

    let foundActiveNavLink = false; // Flag to track if any top-level nav item is active
    let foundActiveDropdownItem = false; // Flag to track if any dropdown item is active

    // 1. Reset all active states initially
    navItems.forEach(item => {
        item.classList.remove('active');
        // If it's a dropdown toggle, also close its menu for a clean slate
        if (item.classList.contains('dropdown-toggle')) {
            const menu = item.nextElementSibling;
            if (menu) menu.classList.remove('show');
        }
    });
    // Ensure all dropdown toggles are reset
    dropdownToggles.forEach(toggle => toggle.classList.remove('active'));
    console.log('Script: All nav items and dropdowns reset (active/show removed).');


    // 2. Set active for direct navigation items (Home, Feedback, etc.)
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href').replace('./', ''); // Normalize href
        console.log('Script: Checking nav item:', item.textContent.trim(), 'Href:', itemHref); // .trim() to clean whitespace
        if (itemHref === currentPath) {
            item.classList.add('active');
            foundActiveNavLink = true;
            console.log('Script: Activated direct nav item:', item.textContent.trim());
        } else if (currentPath === '' && itemHref === 'index.html') {
            // Special case for root path leading to index.html
            item.classList.add('active');
            foundActiveNavLink = true;
            console.log('Script: Activated Home via root path:', item.textContent.trim());
        }
    });

    // 3. Set active for dropdown items and open their parent dropdowns
    dropdownItems.forEach(item => {
        const itemHref = item.getAttribute('href').replace('./', ''); // Normalize href
        console.log('Script: Checking dropdown item:', item.textContent.trim(), 'Href:', itemHref); // .trim() to clean whitespace
        if (itemHref === currentPath) {
            item.classList.add('active'); // Activate the specific dropdown item
            foundActiveDropdownItem = true;
            console.log('Script: Activated dropdown item:', item.textContent.trim());

            const parentDropdown = item.closest('.dropdown');
            if (parentDropdown) {
                const parentDropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                const parentDropdownMenu = parentDropdown.querySelector('.dropdown-menu');

                if (parentDropdownToggle) {
                    parentDropdownToggle.classList.add('active'); // Activate the parent toggle
                    console.log('Script: Activated parent dropdown toggle:', parentDropdownToggle.textContent.trim());
                }
                if (parentDropdownMenu) {
                    parentDropdownMenu.classList.add('show'); // Show the parent menu
                    console.log('Script: Displayed parent dropdown menu for:', parentDropdownToggle.textContent.trim());
                }
            }
        }
    });

    // Fallback: If no specific link or dropdown item matched, ensure 'Home' is active if on the root/index page.
    if (!foundActiveNavLink && !foundActiveDropdownItem && (currentPath === '' || currentPath === 'index.html')) {
        const homeNavItem = document.querySelector('.main-nav ul li a[href="index.html"]');
        if (homeNavItem) {
            homeNavItem.classList.add('active');
            console.log('Script: Fallback: Activated Home nav item.');
        }
    }

    // Dynamic User Name for sidebar and header
    const userNameElement = document.getElementById('user-name');
    const userNameHeaderElement = document.getElementById('user-name-header'); // For header
    if (userNameElement || userNameHeaderElement) {
        const userName = localStorage.getItem('loggedInUser') || 'Guest';
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
        if (userNameHeaderElement) {
            userNameHeaderElement.textContent = userName;
        }
        console.log('Script: User name set to:', userName);
    }
});