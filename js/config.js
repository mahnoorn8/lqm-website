/* ==========================================================================
   LQM Mississauga — Site Configuration
   Edit this file to update site-wide settings without touching other code.
   ========================================================================== */

const LQM_CONFIG = {

  // -----------------------------------------------------------------------
  // Organisation
  // -----------------------------------------------------------------------
  orgName:  'LQ Mississauga',
  orgEmail: 'info@lqmississauga.com',   // used for Netlify Forms notifications

  // -----------------------------------------------------------------------
  // Contact Form
  // Powered by Netlify Forms — submissions are forwarded to orgEmail above.
  // No changes needed here unless you switch form providers.
  // -----------------------------------------------------------------------
  contactFormName: 'contact',           // must match data-netlify-name on the form

  // -----------------------------------------------------------------------
  // Google reCAPTCHA v2
  // 1. Go to https://www.google.com/recaptcha/admin
  // 2. Register site → choose "reCAPTCHA v2 — I'm not a robot"
  // 3. Add domain: lqmississauga.com
  // 4. Paste the Site Key below (keep the quotes)
  // -----------------------------------------------------------------------
  recaptchaSiteKey: 'YOUR_SITE_KEY',

};
