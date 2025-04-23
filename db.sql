CREATE DATABASE MYDATA;
USE MYDATA;
-- 轮播图表 (对应参考轮播图插件设计逻辑‌:ml-citation{ref="3,4" data="citationList"})
CREATE TABLE `carousel` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `file` VARCHAR(512) NOT NULL COMMENT '图片存储路径',
  `href` VARCHAR(512) NOT NULL COMMENT '跳转链接'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 商品分类表 (结合分类层级设计‌:ml-citation{ref="1,2" data="citationList"})
CREATE TABLE `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category` VARCHAR(128) NOT NULL UNIQUE COMMENT '分类名称',
  `description` TEXT NOT NULL COMMENT '分类详情',
  `file` VARCHAR(512) NOT NULL COMMENT '封面图路径',
  `href` VARCHAR(512) NOT NULL COMMENT '分类页链接'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 系统配置表 (参考键值对存储模式‌:ml-citation{ref="1" data="citationList"})
CREATE TABLE `options` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` VARCHAR(128) NOT NULL UNIQUE COMMENT '配置项名称',
  `content` TEXT NOT NULL COMMENT '配置内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 商品信息表 (关联分类表外键‌:ml-citation{ref="4,6" data="citationList"})
CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product` VARCHAR(256) NOT NULL COMMENT '商品名称',
  `description` TEXT NOT NULL COMMENT '商品详情',
  `category` INT UNSIGNED NOT NULL COMMENT '关联分类ID',
  `file` VARCHAR(512) NOT NULL COMMENT '主图路径',
  `href` VARCHAR(512) NOT NULL COMMENT '商品详情页链接',
  FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 用户表 (增加唯一性约束‌:ml-citation{ref="1,7" data="citationList"})
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(320) NOT NULL UNIQUE,
  `email_verified_at` DATETIME NULL,
  `password` VARCHAR(128) NOT NULL,
  `remember_token` VARCHAR(128) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建索引优化查询性能‌:ml-citation{ref="1,2" data="citationList"}
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_users_email ON users(email);

CREATE TABLE `contacts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `content`  VARCHAR(1000),
  `created_date`  DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE `news` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` VARCHAR(128) NOT NULL UNIQUE COMMENT '排序',
  `description` TEXT NOT NULL COMMENT '内容',
  `file` VARCHAR(512) NOT NULL COMMENT '封面图路径',
  `href` VARCHAR(512) NOT NULL COMMENT '链接'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


