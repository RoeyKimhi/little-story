import type { StoryBookData } from "@/types/storyBook";

// Mock only — no FAL/API calls. Placeholder images for development.
export const MOCK_STORY_BOOK: StoryBookData = {
  title: "עמית מגלה דינוזאור קטן",
  coverText: "הרפתקה רכה, צבעונית ומלאת קסם",
  coverImageUrl: "https://picsum.photos/seed/littlestory-cover/500/700",
  pages: [
    {
      pageNumber: 1,
      text: "בבוקר בהיר, עמית יצא אל הגינה עם כובע כחול קטן ונעלי סירה ירוקות. הוא אהב להסתכל על העלים, על הפרחים, ועל כל דבר שמתחבא בין האדמה והשמש.",
      imageUrl: "https://picsum.photos/seed/littlestory-1/500/700",
    },
    {
      pageNumber: 2,
      text: "פתאום, ליד שיח נמוך, עמית מצא אבן עגולה ומבריקה. כשנגע בה בעדינות, האבן נפתחה כמו קליפה של ביצה קטנה, ומתוכה הציץ דינוזאורון ירוק עם נקודות צהובות.",
      imageUrl: "https://picsum.photos/seed/littlestory-2/500/700",
    },
    {
      pageNumber: 3,
      text: "עמית חייך והניח לפני הדינוזאורון עלה גדול כמו צלחת. הדינוזאורון טיפס עליו בשמחה, ועמית עזר לו להגיע אל קערית קטנה של מים נוצצים.",
      imageUrl: "https://picsum.photos/seed/littlestory-3/500/700",
    },
  ],
};
