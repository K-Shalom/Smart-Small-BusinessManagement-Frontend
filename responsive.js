/**
 * 📱 SmartBiz Responsive Sidebar Toggle
 * Reusable JS for Hamburger Menu & Sidebar Overlay
 */

function initResponsive() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    if (!sidebar) return; // Exit if no sidebar (e.g., login/register)

    // 1. Create Overlay Div if not exists
    let overlay = document.getElementById('sidebarOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebarOverlay';
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // 2. Sidebar Toggle Function
    window.toggleSidebar = function() {
        const isActive = sidebar.classList.toggle('active');
        overlay.classList.toggle('active', isActive);
        
        // Prevent scrolling background on mobile when sidebar is open
        if (window.innerWidth < 768) {
            document.body.style.overflow = isActive ? 'hidden' : '';
        }
    };

    // 3. Close Sidebar on Overlay Click
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 4. Close on Nav Item Click (Mobile)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // 5. Handle Window Resize (Reset state if screen expands)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    console.log("🚀 SmartBiz Responsive System initialized.");
}

// Auto-init on load
function initAll() {
    initResponsive();
    initTableSorting();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

/* ── Generic Table Sorting Logic ── */
function initTableSorting() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        const tbody = table.querySelector('tbody');
        if (!tbody || headers.length === 0) return;

        let currentSortColumn = -1;
        let isAscending = true;
        let isOurSort = false;

        const resetHeaders = () => {
            headers.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc', 'sort-none');
                if (h.style.cursor === 'pointer') {
                    h.classList.add('sort-none');
                }
            });
        };

        const observer = new MutationObserver(() => {
            if (isOurSort) return;
            resetHeaders();
            currentSortColumn = -1;
            isAscending = true;
        });
        observer.observe(tbody, { childList: true });

        headers.forEach((th, index) => {
            const label = th.textContent.trim().toLowerCase();
            if (label === 'actions' || label === '') return;

            th.style.cursor = 'pointer';
            th.title = 'Click to sort';
            th.classList.add('sort-none');

            th.addEventListener('click', () => {
                const rows = Array.from(tbody.querySelectorAll('tr'));
                // Do not sort if there's only a single "loading" or "empty" message (colspan)
                if (rows.length === 0 || rows[0].querySelector('td[colspan]')) return;

                if (currentSortColumn === index) {
                    isAscending = !isAscending;
                } else {
                    currentSortColumn = index;
                    isAscending = true;
                }

                resetHeaders();
                th.classList.remove('sort-none');
                th.classList.add(isAscending ? 'sort-asc' : 'sort-desc');

                isOurSort = true;

                rows.sort((a, b) => {
                    const aCell = a.children[index];
                    const bCell = b.children[index];
                    if (!aCell || !bCell) return 0;

                    let aVal = aCell.textContent.trim();
                    let bVal = bCell.textContent.trim();

                    const aNum = parseFloat(aVal.replace(/[^0-9.-]+/g, ""));
                    const bNum = parseFloat(bVal.replace(/[^0-9.-]+/g, ""));
                     
                    const aDate = new Date(aVal);
                    const bDate = new Date(bVal);

                    // Date
                    if (aVal.match(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/) && !isNaN(aDate) && !isNaN(bDate)) {
                        return isAscending ? aDate - bDate : bDate - aDate;
                    }
                    
                    // Number (excluding pure text like names or words that could parse to NaN accidentally)
                    if (!isNaN(aNum) && !isNaN(bNum) && /[0-9]/.test(aVal)) {
                        return isAscending ? aNum - bNum : bNum - aNum;
                    }
                    
                    // String fallback
                    return isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                });

                rows.forEach((row, i) => {
                    tbody.appendChild(row);
                    const firstCol = row.children[0];
                    if (firstCol && headers[0] && headers[0].textContent.replace(/[^a-zA-Z#]/g,'').trim() === '#') {
                        firstCol.textContent = i + 1;
                    }
                });

                setTimeout(() => { isOurSort = false; }, 10);
            });
        });
    });
}

