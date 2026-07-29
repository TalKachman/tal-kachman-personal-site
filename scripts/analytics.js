const GA_MEASUREMENT_ID = 'G-6KRELEX0JY';

if (GA_MEASUREMENT_ID) {
  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(analyticsScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}
