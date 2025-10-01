(function() {
    'use strict';

    const CONFIG = {
        apiUrl: 'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json',
        title: 'Beğenebileceğinizi düşündüklerimiz',
        storageKeys: {
            products: 'ebebek_products',
            favorites: 'ebebek_favorites'
        }
    };

    const state = {
        products: [],
        favorites: JSON.parse(localStorage.getItem(CONFIG.storageKeys.favorites)) || [],
        currentIndex: 0,
        bannerIndex: 0
    };

    function isHomepage() {
    return window.location.pathname === '/' || 
           window.location.pathname === '/index.html' || 
           window.location.href.includes('e-bebek.com') && window.location.pathname === '/';
    }

    function show404Page() {
    const existingContent = document.querySelector('.ebebek-404-page');
    if (existingContent) existingContent.remove();
    
    const page404 = document.createElement('div');
    page404.className = 'ebebek-404-page';
    page404.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; text-align: center; font-family: 'Dosis', sans-serif;">
            <h1 style="font-size: 48px; color: #FF8000; margin-bottom: 20px;">404</h1>
            <p style="font-size: 24px; color: #666; margin-bottom: 30px;">Sayfa bulunamadı</p>
            <button onclick="window.location.href='/'" style="background: #FF8000; color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 16px; cursor: pointer; font-family: 'Dosis', sans-serif;">
                Ana Sayfaya Dön
            </button>
        </div>
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(page404);
    }
    function checkURL() {
    const path = window.location.pathname;
    const validPaths = ['/', '/index.html'];
    
    if (!validPaths.includes(path) && !path.includes('e-bebek.com')) {
        show404Page();
        return false;
    }
    return true;
    }


    function injectStyles() {
        const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700;800&display=swap');

        :root {
            --ebebek-font-family: "Dosis", sans-serif;
            --ebebek-font-weight-light: 400;
            --ebebek-font-weight-normal: 500;
            --ebebek-font-weight-semibold: 600;
            --ebebek-font-weight-bold: 700;
            --ebebek-font-weight-extrabold: 800;
        }

        .ebebek-top-banner,
        .ebebek-header,
        .ebebek-hero-section,
        .ebebek-carousel-section {
            font-family: var(--ebebek-font-family);
        }

        .ebebek-top-banner *,
        .ebebek-header *,
        .ebebek-hero-section *,
        .ebebek-carousel-section * {
            font-family: inherit;
        }

        .ebebek-nav-item {
            font-weight: var(--ebebek-font-weight-bold);
        }

        .ebebek-top-icon {
            font-weight: var(--ebebek-font-weight-semibold);
        }

        .ebebek-banner-text {
            font-weight: var(--ebebek-font-weight-bold);
        }

        .ebebek-carousel-title {
            font-weight: var(--ebebek-font-weight-extrabold);
        }
        .ebebek-hero-section {
            width: 100%;
            background: #1D68A5;
            padding: 40px 0;
            margin: 20px 0 0 0;
        }

        .ebebek-hero-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .ebebek-hero-banner {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .ebebek-hero-content {
            display: flex;
            align-items: center;
            padding: 40px;
            min-height: 300px;
        }

        .ebebek-hero-text {
            flex: 1;
            padding-right: 40px;
        }

        .ebebek-hero-title {
            font-size: 32px;
            line-height: 1.3;
            margin-bottom: 20px;
            color: #333;
        }

        .ebebek-hero-title .brand {
            font-weight: 700;
            color: #333;
        }

        .ebebek-hero-title .highlight {
            color: #E63946;
            font-weight: 700;
        }

        .ebebek-hero-cta {
            display: inline-block;
            background: #FF8500;
            color: white;
            padding: 14px 32px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }

        .ebebek-hero-cta:hover {
            background: #FF6B00;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255,133,0,0.3);
        }

        .ebebek-hero-image {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ebebek-hero-products {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .ebebek-hero-product {
            background: #E8F4F8;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            position: relative;
        }

        .ebebek-hero-product img {
            width: 140px;
            height: 140px;
            object-fit: contain;
        }

        .ebebek-hero-product-label {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: #00A8E8;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
        }

        .ebebek-hero-product-price {
            margin-top: 10px;
            font-weight: 700;
            color: #E63946;
            font-size: 18px;
        }

        .ebebek-hero-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #00A8E8;
            color: white;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0,168,232,0.3);
        }

        .ebebek-hero-badge-number {
            font-size: 36px;
            line-height: 1;
        }

        .ebebek-hero-badge-text {
            font-size: 14px;
        }

        .ebebek-mini-banner-section {
            max-width: 200px;
            margin: 20px auto;
            padding: 0 20px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ebebek-mini-banner-track {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            scroll-behavior: smooth;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 10px 0;
            max-width: 800px;
        }

        .ebebek-mini-banner-track::-webkit-scrollbar {
            display: none;
        }

        .ebebek-mini-banner-item {
            flex: 0 0 auto;
            width: 100px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .ebebek-mini-banner-item:hover {
            transform: translateY(-4px);
        }

        .ebebek-mini-banner-item img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .ebebek-mini-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 36px;
            height: 36px;
            background: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            z-index: 10;
        }

        .ebebek-mini-nav:hover {
            background: #f5f5f5;
        }

        .ebebek-mini-nav.left {
            left: 10px;
        }

        .ebebek-mini-nav.right {
            right: 10px;
        }

        .ebebek-mini-nav svg {
            width: 20px;
            height: 20px;
            fill: #333;
        }

        .ebebek-carousel-section {
            width: 100%;
            background: #FFFFFF;
            padding: 30px 0 0 0;
            margin: 30px 0;
            font-family: 'Arial', sans-serif;
            border-radius: 24px 24px 0 0;
            position: relative;
            overflow: visible;
        }

        .ebebek-carousel-container {
            background: #FDF7ED;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
            border-radius: 24px;
            position: relative;
            overflow: visible;
        }

        .ebebek-carousel-navigation {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            align-items: center;
            pointer-events: none;
            width: 100%;
        }

        .ebebek-top-banner {
            background: #0092DB;
            width: 100%;
            padding: 12px 0;
            color: white;
            font-family: "Dosis", sans-serif;
            position: relative;
        }

        .ebebek-top-banner-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ebebek-banner-text {
            flex: 1;
            text-align: center;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: 0.5px;
        }

        .ebebek-banner-right {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .ebebek-banner-link {
            display: flex;
            align-items: center;
            gap: 6px;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.3s ease;
        }

        .ebebek-banner-link:hover {
            opacity: 0.8;
        }

        .ebebek-banner-icon {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .ebebek-hero-nav {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 15px;
            flex-wrap: wrap;
            align-items: center;
        }

        .ebebek-hero-nav-item {
            font-weight: 900;
            color: #FFFFFF;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            font-size: 14px;
        }

        .ebebek-hero-nav-button {
            font-weight: 900;
            color: #F28E00;
            background: #FEF6EB;
            border: none;
            padding: 10px 20px;
            border-radius: 40px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }

.ebebek-hero-nav-button:hover {
    background: #FFE4CC;
    transform: translateY(-2px);
}

        .ebebek-carousel-navigation .ebebek-arrow-btn {
            pointer-events: all;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #FEF6EB;
            display: flex;
            align-items: center;
            outline: none;
            border: none;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .ebebek-carousel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px 20px 20px;
        }

        .ebebek-carousel-wrapper {
            position: relative;
            overflow: hidden;
            background: #fff;
            margin: 0 -5px;
        }

        .ebebek-carousel-title {
            font-size: 24px;
            font-weight: 700;
            color: #FF8000;
            margin: 0;
            margin-left: 25px;
            margin-top: 20px;
        }

        .ebebek-arrow-btn:hover:not(:disabled) {
            background: #FEF6EB;
            box-shadow: 0 4px 12px rgba(242, 142, 0, 0.3);
        }

        .ebebek-arrow-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .ebebek-arrow-btn svg {
            width: 20px;
            height: 20px;
            fill: #F28E00;
        }

        .ebebek-carousel-track {
            display: flex;
            gap: 10px;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            padding-top: 10px;
        }

        .ebebek-product-card {
            flex: 0 0 calc(20% - 10px);
            background: #FFFFFF;
            margin-top: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: flex;
            flex-direction: column;
            border: 1px solid #E0E0E0;
            box-sizing: border-box;
        }

        .ebebek-product-card:hover {
            transform: translateY(-4px);
        }

        .ebebek-product-image-wrapper {
            position: relative;
            width: 100%;
            padding-top: 100%;
            background: #FFFFFF;
            overflow: hidden;
        }

        .ebebek-product-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 15px;
        }

        .ebebek-badge-group {
            position: absolute;
            top: 8px;
            left: 8px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            z-index: 2;
            align-items: flex-start;
        }

        .ebebek-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            color: #FFFFFF;
            display: inline-block;
            line-height: 1.2;
        }

        .ebebek-badge-discount {
            margin-top: 28px;
            background: linear-gradient(135deg, #00A365 0%, #00A365 100%);
        }

        .ebebek-favorite-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 32px;
            height: 32px;
            background: #FFFFFF;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3;
            transition: all 0.2s ease;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .ebebek-favorite-btn:hover {
            transform: scale(1.1);
        }

        .ebebek-favorite-btn svg {
            width: 18px;
            height: 18px;
            transition: all 0.2s ease;
        }

        .ebebek-favorite-btn:not(.active) svg {
            fill: none;
            stroke: #FF8A00;
            stroke-width: 2;
        }

        .ebebek-favorite-btn.active svg {
            fill: #FF8000;
            stroke: none;
        }

        .ebebek-product-info {
            padding: 12px 14px 14px;
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 4px;
        }

        .ebebek-product-title-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 4px;
            margin-bottom: 8px;
            line-height: 1.3;
        }

        .ebebek-logo {
            height: 40px;
            width: auto;
        }

        .ebebek-product-brand {
            font-size: 12px;
            color: #8E7D7D;
            font-weight: 800;
            white-space: nowrap;
        }

        .ebebek-product-name {
            font-size: 13px;
            color: #666666;
            line-height: 1.4;
            margin-bottom: 12px;
            height: 36px;
            overflow: hidden;
            display: -webkit-box;
                        -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            flex: 1;
        }

        .ebebek-rating {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 10px;
        }

        .ebebek-stars {
            display: flex;
            gap: 2px;
        }

        .ebebek-star {
            width: 14px;
            height: 14px;
        }

        .ebebek-star.filled {
            fill: #FBD10F;
        }

        .ebebek-star.empty {
            fill: #E0E0E0;
        }

        .ebebek-rating-count {
            font-size: 11px;
            color: #8E7D81;
        }

        .ebebek-installment-info {
            font-size: 11px;
            color: #55B888;
            margin-bottom: 15px;
            font-weight: 600;
            background: #EAF8F3;
            padding: 2px 6px;
            align-self: flex-start;
            margin-top: auto;
            border-radius: 20px;
        }

        .ebebek-price-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-bottom: 8px;
        }

        .ebebek-original-price-with-discount {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .ebebek-original-price {
            color: #999999;
            text-decoration: line-through;
            font-size: 14px;
        }

        .ebebek-discount-badge {
            background: #00A365;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
        }

        .ebebek-discount-price {
            font-size: 18px;
            font-weight: 700;
            color: #00A365;
        }

        .ebebek-normal-price {
            font-size: 18px;
            font-weight: 700;
            color: #7D7D7D;
        }

        .ebebek-btn {
            padding: 15px 6px;
            border-radius: 30px;
            font-size: 12px;
            font-weight: 1000;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #FEF8EF;
            color: #F28E00;
        }

        .ebebek-btn:hover {
            background: #FFE4CC;
        }


        .ebebek-header {
            background: #FFFFFF;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 0;
        }

        .ebebek-header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ebebek-logo {
            height: 40px;
            width: auto;
        }

        .ebebek-search-container {
            flex: 1;
            max-width: 600px;
            margin: 0 40px;
            position: relative;
        }

        .ebebek-search-input {
            width: 100%;
            font-family: "Dosis", sans-serif;
            padding: 12px 20px;
            border: 2px solid #00A8E8;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 900;
            outline: none;
            transition: all 0.3s ease;
        }
        .ebebek-search-input::placeholder {
            color: #555555;
            font-family: "Dosis", sans-serif;
            font-size: 18px;
            font-weight: 900;
            opacity: 1;
        }
            font-size: 18px;
            font-weight: 900;
            opacity: 1;
            font-weight: 500;
        }

        .ebebek-search-input::-webkit-input-placeholder {
            color: #555555;
            font-size: 18px;
        }

        .ebebek-search-input:focus {
            border-color: #0096D6;
            box-shadow: 0 0 0 3px rgba(0,168,232,0.1);
        }

        .ebebek-search-button {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            background: #00A8E8;
            border: none;
            border-radius: 20px;
            padding: 8px 20px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .ebebek-search-button:hover {
            background: #0096D6;
        }

        .ebebek-header-links {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .ebebek-header-link {
            font-size: 12px;
            color: #666;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .ebebek-header-link:hover {
            color: #00A8E8;
        }

        @media (max-width: 768px) {
            .ebebek-header-container {
                flex-direction: column;
                gap: 15px;
            }
            
            .ebebek-search-container {
                margin: 0;
                max-width: 100%;
            }
            
            .ebebek-header-links {
                gap: 15px;
            }
        }

        .ebebek-top-header,
        .ebebek-bottom-header {
            font-family: "Dosis", sans-serif;
        }

        .ebebek-top-header {
            background: #FFFFFF;
            border-bottom: 1px solid #E0E0E0;
            padding: 10px 0;
        }

        .ebebek-top-header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ebebek-top-left {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        .ebebek-sepet {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            color: #333;
            text-decoration: none;
            font-size: 14px;
        }

        .ebebek-top-search {
            flex: 1;
            max-width: 600px;
            margin: 0 40px;
            position: relative;
        }

        .ebebek-top-search-input {
            width: 100%;
            padding: 12px 20px 12px 45px;
            border: 2px solid #009FE1;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            outline: none;
            background: #F5F5F5;
            transition: all 0.3s ease;
        }

        .ebebek-top-search-input:focus {
            border-color: #0080C7;
            background: #FFFFFF;
            box-shadow: 0 0 0 3px rgba(0, 159, 225, 0.1);
        }

        .ebebek-top-search-input::placeholder {
            color: #666;
            font-weight: 600; /* Kalın placeholder */
            font-size: 16px;
        }

        .ebebek-search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            fill: #666;
            pointer-events: none;
        }

        .ebebek-top-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .ebebek-top-icon {
            display: flex;
            font-family: "Dosis", sans-serif;
            align-items: center;
            gap: 8px;
            color: #5AD1FF;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 12px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            border: 1px solid #E0E0E0;
        }

        .ebebek-top-icon:nth-child(1) {
            background: #EBF6FC;
            border-color: #D1ECF7;
        }

        .ebebek-top-icon:nth-child(2) {
            background: #FFFFFF;
            border-color: #E0E0E0;
        }

        .ebebek-top-icon:nth-child(3) {
            background: #F8F9FA;
            border-color: #E0E0E0;
            color: #5AD1FF;
        }

        .ebebek-top-icon:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(90, 209, 255, 0.2);
        }

        .ebebek-top-icon:nth-child(1):hover {
            background: #E1F2FA;
            border-color: #5AD1FF;
        }

        .ebebek-top-icon:nth-child(2):hover {
            background: #F5F5F5;
            border-color: #5AD1FF;
        }

        .ebebek-top-icon:nth-child(3):hover {
            background: #F0F0F0;
            border-color: #5AD1FF;
        }

        .ebebek-icon {
            width: 20px;
            height: 20px;
            fill: #5AD1FF; /* İkon rengi */
        }

        .ebebek-bottom-header {
            background: #FFFFFF;
            border-bottom: 1px solid #E0E0E0;
            padding: 12px 0;
        }

        .ebebek-bottom-header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ebebek-nav-left {
            display: flex;
            align-items: center;
            gap: 30px;
        }
        
        .ebebek-nav-item {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #686868;
            text-decoration: none;
            font-family: "Dosis", sans-serif;
            font-size: 18px;
            font-weight: 800;
            position: relative;
            padding: 8px 0;
            transition: color 0.3s ease;
        }

        .ebebek-nav-item:hover {
            color: #0092DB;
        }

        .ebebek-nav-item.internet-ozel {
            color: #0091D6;
            font-weight: 600;
        }

        .ebebek-nav-item.kampanyalar {
            color: #F28E00;
            font-weight: 600;
        }

        .ebebek-nav-item.outlet {
            color: #F28E00;
            font-weight: 600;
        }

        .ebebek-nav-arrow {
            width: 16px;
            height: 16px;
            fill: currentColor;
            transition: transform 0.3s ease;
        }

        .ebebek-nav-item:hover .ebebek-nav-arrow {
            transform: rotate(180deg);
        }

        .ebebek-nav-right {
            display: flex;
            align-items: center;
        }

        .ebebek-nav-right-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #686894;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 8px 16px;
            border-left: 1px solid #E0E0E0;
            transition: color 0.3s ease;
        }

        .ebebek-nav-right-item:first-child {
            border-left: none;
        }

        .ebebek-nav-right-item:hover {
            color: #0092DC;
        }

        .ebebek-nav-icon {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        @media (max-width: 1200px) {
            .ebebek-product-card {
                flex: 0 0 calc(25% - 7.5px);
            }
        }

        @media (max-width: 992px) {
            .ebebek-hero-content {
                flex-direction: column;
                text-align: center;
                padding: 30px 20px;
            }

            .ebebek-hero-text {
                padding-right: 0;
                margin-bottom: 30px;
            }

            .ebebek-hero-products {
                flex-wrap: wrap;
                justify-content: center;
            }

            .ebebek-product-card {
                flex: 0 0 calc(33.333% - 6.67px);
            }
        }

        @media (max-width: 768px) {
            .ebebek-hero-title {
                font-size: 24px;
            }

            .ebebek-hero-badge {
                width: 80px;
                height: 80px;
            }

            .ebebek-hero-badge-number {
                font-size: 28px;
            }

            .ebebek-product-card {
                flex: 0 0 calc(50% - 5px);
            }
        }

        @media (max-width: 480px) {
            .ebebek-hero-section {
                padding: 20px 0;
            }

            .ebebek-hero-title {
                font-size: 20px;
            }

            .ebebek-hero-product img {
                width: 100px;
                height: 100px;
            }

            .ebebek-carousel-title {
                font-size: 18px;
            }
        }
        `;

        if (!document.querySelector('#ebebek-carousel-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'ebebek-carousel-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }
    }

    function setupBannerTextRotation() {
    const bannerText = document.getElementById('ebebek-banner-text');
    if (!bannerText) return;

    const texts = [
        "Peşin Fiyatına 8 Taksit Fırsatı !",
        "Seçili mobilyalarda ücretsiz montaj hizmeti!"
    ];

    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        bannerText.textContent = texts[currentIndex];
    }, 5000);
}

    function createTopBanner() {
    const banner = document.createElement('div');
    banner.className = 'ebebek-top-banner';
    
    banner.innerHTML = `
        <div class="ebebek-top-banner-container">
            <!-- Sol taraf boş bırakıldı -->
            <div></div>
            
            <!-- Orta kısım - değişen yazı -->
            <div class="ebebek-banner-text" id="ebebek-banner-text">
                Peşin Fiyatına 8 Taksit Fırsatı !
            </div>
            
            <!-- Sağ kısım - linkler -->
            <div class="ebebek-banner-right">
                <a href="#" class="ebebek-banner-link">
                    <svg class="ebebek-banner-icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                    YARDIM
                </a>
                <a href="#" class="ebebek-banner-link">
                    <svg class="ebebek-banner-icon" viewBox="0 0 24 24">
                    <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z"/>
                    </svg>
                    İLETİŞİM
                </a>
                <a href="#" class="ebebek-banner-link">
                    SATICI BAŞVURU
                </a>
            </div>
        </div>
    `;
    return banner;
}

    function createHeaderNavbar() {
    const header = document.createElement('div');
    header.className = 'ebebek-header';
    
header.innerHTML = `
    <div class="ebebek-top-header">
        <div class="ebebek-top-header-container">
            <div class="ebebek-top-left">
                <img src="https://cdn05.e-bebek.com/y.ebebek/9973673459742.svg" alt="ebebek" class="ebebek-logo">
            </div>
            
            <div class="ebebek-top-search">
                <!-- Search ikonu eklendi -->
                <svg class="ebebek-search-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input type="text" placeholder="Kategori, marka veya ürün ara..." class="ebebek-top-search-input">
            </div>
            
            <div class="ebebek-top-right">
                <a href="#" class="ebebek-top-icon">
                    <svg class="ebebek-icon" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </a>
                <!-- Hesabım -->
                <a href="#" class="ebebek-top-icon">
                    <svg class="ebebek-icon" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Hesabım
                </a>
                <a href="#" class="ebebek-top-icon">
                    <svg class="ebebek-icon" viewBox="0 0 24 24">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    SEPETİM
                </a>
            </div>
        </div>
    </div>
    
    <div class="ebebek-bottom-header">
        <div class="ebebek-bottom-header-container">
            <div class="ebebek-nav-left">
                <a href="#" class="ebebek-nav-item">
                    Kategoriler
                    <svg class="ebebek-nav-arrow" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </a>
                <a href="#" class="ebebek-nav-item">
                    Keşfet
                    <svg class="ebebek-nav-arrow" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </a>
                <a href="#" class="ebebek-nav-item">
                    Hediye
                    <svg class="ebebek-nav-arrow" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </a>
                <a href="#" class="ebebek-nav-item internet-ozel">
                    İnternete Özel Ürünler
                </a>
                <a href="#" class="ebebek-nav-item kampanyalar">
                    Kampanyalar
                </a>
                <a href="#" class="ebebek-nav-item outlet">
                    Outlet
                </a>
            </div>
            
            <div class="ebebek-nav-right">
                <a href="#" class="ebebek-nav-right-item">
                    <svg class="ebebek-nav-icon" viewBox="0 0 24 24">
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                    SİPARİŞİM NEREDE
                </a>
                <a href="#" class="ebebek-nav-right-item">
                    <svg class="ebebek-nav-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    EN YAKIN EBEBEK
                </a>
            </div>
        </div>
    </div>
`;
    return header;
}

    function createHeroBanner() {
    const section = document.createElement('div');
    section.className = 'ebebek-hero-section';
    
    section.innerHTML = `
        <div class="ebebek-hero-container">
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 15px; flex-wrap: wrap;">
                   <button style="font-weight: 900; color: #F28E00; background: #FEF6EB; border: none; padding: 10px 20px; border-radius: 40px; cursor: pointer; transition: all 0.3s ease;">
                24 SAAT!
            </button>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">KAMPANYALAR</span>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">TEKSTİL</span>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">EMZİRME HAFTASI</span>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">BAKIM TEMİZLİK</span>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">BEZ&MENDİL</span>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">KEŞFET</span>
                    <span style="font-weight: 900; color: #FFFFFF; font-family: 'Arial', sans-serif;">DUYURU</span>
                </div>

            <div class="ebebek-hero-banner" style="margin-bottom: 20px;">
                <a href="https://www.e-bebek.com/indirimler-kampanyalar/secili-uyku-urunlerinde-3-al-2-ode-internete-ozel-_1000026569-kampanya" 
                   target="_blank" 
                   style="display:block; text-decoration:none;">
                    <img src="https://cdn05.e-bebek.com/media/c/secili-uyku-urunlerinde-3-al-2-ode-internete-ozel-3009d.jpg" 
                         alt="Seçili Uyku Ürünlerinde 3 Al 2 Öde" 
                         style="width:100%; height:auto; display:block; border-radius:16px;">
                </a>
            </div>
        </div>

        <div class="ebebek-mini-banner-section">
    <button class="ebebek-mini-nav left" id="ebebek-mini-prev">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
    <div class="ebebek-mini-banner-track" id="ebebek-mini-track">
        ${Array.from({length: 1}, (_, i) => `
            <div class="ebebek-mini-banner-item">
                <img 
                    src="https://cdn05.e-bebek.com/media/c/secili-uyku-urunlerinde-3-al-2-ode-internete-ozel-3009d.jpg" 
                    alt="Mini Banner ${i+1}"
                    style="width:100px;height:60px;object-fit:cover;border-radius:8px;"
                />
            </div>
        `).join('')}
    </div>
    <button class="ebebek-mini-nav right" id="ebebek-mini-next">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </button>
</div>

    `;
    return section;
}

    async function fetchProducts() {
        const cached = localStorage.getItem(CONFIG.storageKeys.products);
        
        if (cached) {
            console.log('Loading products from local storage');
            return JSON.parse(cached);
        }

        console.log('Fetching products from API');
        try {
            const response = await fetch(CONFIG.apiUrl);
            const products = await response.json();
            localStorage.setItem(CONFIG.storageKeys.products, JSON.stringify(products));
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [
                {
                    id: 1,
                    brand: "Hello Baby",
                    name: "Yenidoğan 6lı Ağız Mendili 24x24cm Unisex",
                    price: 479.99,
                    original_price: 599.99,
                    img: "https://www.e-bebek.com/",
                    url: "#"
                },
                {
                    id: 2,
                    brand: "Baby Toys",
                    name: "Sevimli İlk Avcılık Oyunu",
                    price: 129.99,
                    original_price: 159.99,
                    img: "https://www.e-bebek.com/",
                    url: "#"
                }
            ];
        }
    }

    function calculateDiscount(originalPrice, currentPrice) {
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }

    function formatPrice(price) {
        return price.toFixed(2).replace('.', ',') + ' TL';
    }

    function isFavorite(productId) {
        return state.favorites.includes(productId);
    }

    function toggleFavorite(productId) {
        const index = state.favorites.indexOf(productId);
        
        if (index > -1) {
            state.favorites.splice(index, 1);
        } else {
            state.favorites.push(productId);
        }

        localStorage.setItem(CONFIG.storageKeys.favorites, JSON.stringify(state.favorites));
    }

    function getVisibleCards() {
        const width = window.innerWidth;
        if (width <= 480) return 2;
        if (width <= 768) return 2;
        if (width <= 992) return 3;
        if (width <= 1200) return 4;
        return 5;
    }

    function generateRating() {
        const rating = Math.floor(Math.random() * 2) + 4;
        const count = Math.floor(Math.random() * 100) + 1;
        return { rating, count };
    }

    function createProductCard(product) {
    const hasDiscount = product.price < product.original_price;
    const discountPercent = hasDiscount ? calculateDiscount(product.original_price, product.price) : 0;
    const favorite = isFavorite(product.id);
    const { rating, count } = generateRating();

    const card = document.createElement('div');
    card.className = 'ebebek-product-card';
    card.setAttribute('data-product-id', product.id);

    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<svg class="ebebek-star ${i <= rating ? 'filled' : 'empty'}" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }

    card.innerHTML = `
    <div class="ebebek-product-image-wrapper">
        <div class="ebebek-badge-group">
            <!-- CARGO FREE BADGE -->
            <div class="ebebek-shipping-badge">
                <img src="https://www.e-bebek.com/assets/images/kargo-bedava.png" alt="Kargo Bedava" style="width:90px;height:36px;">
            </div>
            ${hasDiscount ? `<span class="ebebek-badge">%${discountPercent}</span>` : ''}
        </div>
        <button class="ebebek-favorite-btn ${favorite ? 'active' : ''}" data-product-id="${product.id}">
            <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </button>
        <img src="${product.img}" alt="${product.name}" class="ebebek-product-image" loading="lazy">
    </div>
    <div class="ebebek-product-info">
        <div class="ebebek-product-title-wrapper">
            <span class="ebebek-product-brand">${product.brand}</span>
            <span class="ebebek-product-name">- ${product.name}</span>
        </div>
        <div class="ebebek-rating">
            <div class="ebebek-stars">${starsHTML}</div>
            <span class="ebebek-rating-count">(${count})</span>
        </div>
        ${hasDiscount ? `
            <div class="ebebek-price-container">
                <div class="ebebek-original-price-with-discount">
                    <span class="ebebek-original-price">${formatPrice(product.original_price)}</span>
                    <span class="ebebek-discount-badge">%${discountPercent}↓</span>
                </div>
                <span class="ebebek-discount-price">${formatPrice(product.price)}</span>
            </div>
        ` : `
            <div class="ebebek-price-container">
                <span class="ebebek-normal-price">${formatPrice(product.price)}</span>
            </div>
        `}
        <div class="ebebek-installment-info">Farklı ürünlerde 3 Al 2 Öde</div>
        <button class="ebebek-btn">Sepete Ekle</button>
    </div>
    `;

    return card;
}

    function createCarousel() {
        const section = document.createElement('div');
        section.className = 'ebebek-carousel-section';
        section.id = 'ebebek-custom-carousel';

        section.innerHTML = `
            <div class="ebebek-carousel-container">
                <div class="ebebek-carousel-header">
                    <h2 class="ebebek-carousel-title">${CONFIG.title}</h2>
                </div>
                <div class="ebebek-carousel-wrapper">
                    <div class="ebebek-carousel-track" id="ebebek-carousel-track"></div>
                    <div class="ebebek-carousel-navigation">
                        <button class="ebebek-arrow-btn" id="ebebek-prev-btn" aria-label="Previous">
                            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                        </button>
                        <button class="ebebek-arrow-btn" id="ebebek-next-btn" aria-label="Next">
                            <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        return section;
    }

    function updateCarousel() {
        const track = document.getElementById('ebebek-carousel-track');
        if (!track) return;
        
        const visibleCards = getVisibleCards();
        const cardWidth = 100 / visibleCards;
        const offset = state.currentIndex * cardWidth;
        
        track.style.transform = `translateX(-${offset}%)`;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const prevBtn = document.getElementById('ebebek-prev-btn');
        const nextBtn = document.getElementById('ebebek-next-btn');
        if (!prevBtn || !nextBtn) return;
        
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, state.products.length - visibleCards);

        prevBtn.disabled = state.currentIndex === 0;
        nextBtn.disabled = state.currentIndex >= maxIndex;
    }

    function nextSlide() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, state.products.length - visibleCards);
        
        if (state.currentIndex < maxIndex) {
            state.currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            updateCarousel();
        }
    }

    function setupMiniBannerEvents() {
    const prevBtn = document.getElementById('ebebek-mini-prev');
    const nextBtn = document.getElementById('ebebek-mini-next');
    const track = document.getElementById('ebebek-mini-track');

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -120, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 120, behavior: 'smooth' });
        });
    }
}

function setupHeaderEvents() {
    const topSearchInput = document.querySelector('.ebebek-top-search-input');
    
    if (topSearchInput) {
        topSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(topSearchInput.value);
            }
        });
    }
    
    const navItems = document.querySelectorAll('.ebebek-nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const arrow = item.querySelector('.ebebek-nav-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(180deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const arrow = item.querySelector('.ebebek-nav-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
}

function performSearch(query) {
    if (query.trim()) {
        console.log('Arama yapılıyor:', query);
    }
}

    function setupEventListeners() {
        const prevBtn = document.getElementById('ebebek-prev-btn');
        const nextBtn = document.getElementById('ebebek-next-btn');
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        const section = document.getElementById('ebebek-custom-carousel');
        if (section) {
            section.addEventListener('click', (e) => {
                const favoriteBtn = e.target.closest('.ebebek-favorite-btn');
                const actionBtn = e.target.closest('.ebebek-btn');
                const card = e.target.closest('.ebebek-product-card');

                if (favoriteBtn) {
                    e.stopPropagation();
                    const productId = parseInt(favoriteBtn.getAttribute('data-product-id'));
                    toggleFavorite(productId);
                    favoriteBtn.classList.toggle('active');
                } else if (actionBtn) {
                    e.stopPropagation();
                } else if (card) {
                    const productId = parseInt(card.getAttribute('data-product-id'));
                    const product = state.products.find(p => p.id === productId);
                    if (product) {
                        window.open(product.url, '_blank');
                    }
                }
            });
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                state.currentIndex = 0;
                updateCarousel();
            }, 250);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }

    async function init() {
    console.log('Initializing e-bebek carousel...');

    if (!checkURL()) {
        return;
    }

    if (!isHomepage()) {
        console.log('wrong page');
        return;
    }

    const existingCarousel = document.getElementById('ebebek-custom-carousel');
    const existingHero = document.querySelector('.ebebek-hero-section');
    const existingHeader = document.querySelector('.ebebek-header');
    const existingBanner = document.querySelector('.ebebek-top-banner');

    if (existingCarousel) existingCarousel.remove();
    if (existingHero) existingHero.remove();
    if (existingHeader) existingHeader.remove();
    if (existingBanner) existingBanner.remove();

    injectStyles();

    state.products = await fetchProducts();

    if (state.products.length === 0) {
        console.error('No products to display');
        return;
    }

    const topBanner = createTopBanner();
    const headerNavbar = createHeaderNavbar();
    const heroBanner = createHeroBanner();
    const carousel = createCarousel();

    setupBannerTextRotation();

    let target = document.body;
    if (!target) {
        document.documentElement.appendChild(topBanner);
        document.documentElement.appendChild(headerNavbar);
        document.documentElement.appendChild(heroBanner);
        document.documentElement.appendChild(carousel);
    } else {
        target.prepend(carousel);
        target.prepend(heroBanner);
        target.prepend(headerNavbar);
        target.prepend(topBanner);
    }

    const track = document.getElementById('ebebek-carousel-track');
    if (track) {
        state.products.forEach(product => {
            track.appendChild(createProductCard(product));
        });
    }

    setupEventListeners();
    setupHeaderEvents(); 
    setupMiniBannerEvents();
    setupBannerTextRotation();
    updateCarousel();


    console.log('✅ Carousel initialized successfully!');
    console.log(`📦 Loaded ${state.products.length} products`);
    console.log(`❤️  ${state.favorites.length} favorites`);
}


init();
})();