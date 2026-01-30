/**
 * 项目质控助手 - 通用交互脚本
 * 处理导航栏的通知面板和用户菜单交互
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigationInteractions();
});

// 初始化导航栏交互
function initNavigationInteractions() {
    // 通知面板切换
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    
    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationPanel.classList.toggle('hidden');
            // 关闭用户菜单
            const userMenu = document.getElementById('userMenu') || document.getElementById('userMenuPanel');
            if (userMenu) {
                userMenu.classList.add('hidden');
            }
        });
    }

    // 用户菜单切换
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu') || document.getElementById('userMenuPanel');
    
    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
            // 关闭通知面板
            if (notificationPanel) {
                notificationPanel.classList.add('hidden');
            }
        });
    }

    // 点击外部关闭所有下拉菜单
    document.addEventListener('click', function() {
        if (notificationPanel) {
            notificationPanel.classList.add('hidden');
        }
        if (userMenu) {
            userMenu.classList.add('hidden');
        }
    });

    // 阻止面板内部点击事件冒泡
    if (notificationPanel) {
        notificationPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// 标记所有通知为已读
function markAllNotificationsAsRead() {
    console.log('标记所有通知为已读');
    // 这里可以添加实际的 API 调用
    const unreadDots = document.querySelectorAll('#notificationPanel .bg-blue-500, #notificationPanel .bg-yellow-500, #notificationPanel .bg-green-500');
    unreadDots.forEach(dot => {
        dot.classList.remove('bg-blue-500', 'bg-yellow-500', 'bg-green-500');
        dot.classList.add('bg-gray-300');
    });
}

// 清空所有通知
function clearAllNotifications() {
    console.log('清空所有通知');
    // 这里可以添加实际的 API 调用
    const notificationList = document.querySelector('#notificationPanel .max-h-96');
    if (notificationList) {
        notificationList.innerHTML = '<div class="p-8 text-center text-gray-500">暂无通知</div>';
    }
}

// 打开关于系统弹窗
function openAboutSystem() {
    console.log('打开关于系统');
    alert('项目质控助手 v3.0\n\n用于项目质量控制和管理的专业工具。');
}

// 处理退出登录
function handleLogout() {
    console.log('退出登录');
    if (confirm('确定要退出登录吗？')) {
        // 这里可以添加实际的退出登录逻辑
        window.location.href = 'login.html';
    }
}
