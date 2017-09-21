<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'shop_thong');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'yRJH%<9,,(@3jWsHIG=R,3w qm=^%U<@zT.d.O@^dqnW(5p1#(Tx)?j{UV5Pg4Y#');
define('SECURE_AUTH_KEY',  'Ku_8g9%.]S`!{hv|VkA33(<S9|s{LH2L0ZW;]W2 x$e70LP~oX8 ry3b:6xzSFXq');
define('LOGGED_IN_KEY',    '}C_!uYXGCV9}&Ixa:U|TpzyyiM~}gvN^W54*sD8P38LlMBo>H,xs4)HK~(C~hn~M');
define('NONCE_KEY',        '+VZIooTk(),0L9.B2sNP6:^L$Pp[k[t:FU:#s%l(4UkDlkJL5wuZ@F?+K[T@E0Uh');
define('AUTH_SALT',        'NgI{7<10Z;LUBV:QQ#p&t3Z/7<7GW$X$:PpNJ7~[MV@ma(+:q-O_aacr*%Cc6Qmj');
define('SECURE_AUTH_SALT', '`)0i82P>==pZkp/w-OHkF|fR{r{ZU(}sTZ0rPFLeK3W=sh[6dj%PcCxJBkz)iC_T');
define('LOGGED_IN_SALT',   '~09z(H.i4N5]#w~St{dr4@.:kXv9Ost9Ek$3NA~W]QAf<y5yxzu}/JD3Q=XI(hHC');
define('NONCE_SALT',       '.sPgqHj2b,~2%d,6p=`P5g0V6X7{SgPng`?e[NhYj/74W&`goO%Nc e^:M4yb2?R');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
