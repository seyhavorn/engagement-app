import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export function useMetadata() {
  const route = useRoute();

  watchEffect(() => {
    const nameParam = (route.query.name as string) || 'ភ្ញៀវកិត្តិយស';
    const titleText = `សូមគោរពអញ្ជើញ ៖ ${nameParam} — ពិធីភ្ជាប់ពាក្យ (វន សីហា & សួង ដាវីត)`;
    const descText = `បេះដូងពីរ ស្នេហាមួយ ការចាប់ផ្តើមដ៏ស្រស់ស្អាតមួយ។ យើងខ្ញុំសូមគោរពអញ្ជើញ ${nameParam} មកចូលរួមអបអរសាទរក្នុងពិធីភ្ជាប់ពាក្យ វន សីហា & សួង ដាវីត នៅថ្ងៃសៅរ៍ ទី២២ ខែសីហា ឆ្នាំ២០២៦។`;

    document.title = titleText;

    // Update OpenGraph Title & Description for Telegram
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', titleText);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descText);

    // Absolute Preview Image URL for Telegram Bot Parser
    const fullImageUrl = `${window.location.origin}${import.meta.env.BASE_URL}images/seyha_david_1.jpg`;
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', fullImageUrl);

    const ogImgSecure = document.querySelector('meta[property="og:image:secure_url"]');
    if (ogImgSecure) ogImgSecure.setAttribute('content', fullImageUrl);
  });
}
