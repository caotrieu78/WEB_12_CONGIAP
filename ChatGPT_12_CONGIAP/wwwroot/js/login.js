﻿$(document).ready(function () {
    $(".login-form button").on("click", function (e) {
        e.preventDefault(); // Ngăn chặn reload trang mặc định khi bấm nút

        // Lấy giá trị từ input
        const username = $("#username_login").val().trim();
        const password = $("#password_login").val().trim();

        // Kiểm tra nếu email hoặc password trống
        if (!username || !password) {
            alert("Tên và mật khẩu không được để trống!");
            return;
        }

        // Chuẩn bị payload cho request
        const request = {
            username: username,
            password: password,
        };

        console.log("Sending request:", request);

        // Gửi yêu cầu AJAX
        $.ajax({
            url: "http://127.0.0.1:5000/user/authenticate", // URL API
            method: "POST",
            data: JSON.stringify(request),
            contentType: "application/json",
            success: function (response) {
                console.log("Login successful", response);

                // Kiểm tra và xử lý group_id
                if (response && response.group_id !== undefined) {
                    const groupId = response.group_id;

                    localStorage.setItem("username", username);
                    localStorage.setItem("team_id", response.user_id);

                    // Điều hướng dựa trên group_id
                    switch (groupId) {
                        case 0:
                        case 1:
                        case 2:
                            window.location.href = '/Home';
                            break;
                        default:
                            window.location.href = '/Home'; // Điều hướng mặc định
                            break;
                    }
                } else {
                    alert("Không thể lấy thông tin nhóm người dùng. Vui lòng thử lại.");
                }
            },
            error: function (error) {
                console.error("Login failed", error);
                alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
            },
        });
    });
});

// Kiểm tra nếu "username" có trong localStorage
const username = localStorage.getItem("username");
const teamId = localStorage.getItem("team_id");

if (username && teamId) {
    console.log("Username and Team ID are already in localStorage.");
    // Thực hiện hành động khi đã có giá trị trong localStorage
} else {
    console.log("No username or team ID found in localStorage.");
    // Thực hiện hành động khi không có giá trị trong localStorage
}