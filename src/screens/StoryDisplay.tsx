import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
}

interface StoryData {
  message: string;
  receivedImage: boolean;
  title: string;
  coverText: string;
  coverImageUrl: string;
  pages: StoryPage[];
}

const MOCK_STORY: StoryData = {
  message: "Book generated successfully",
  receivedImage: true,
  title: "עמית מגלה דינוזאור קטן",
  coverText: "הרפתקה רכה, צבעונית ומלאת קסם",
  coverImageUrl:
    "https://v3b.fal.media/files/b/0a94455b/Lb7utkz-LfEidhjVQTTe8_image.png",
  pages: [
    {
      pageNumber: 1,
      text: "בבוקר בהיר, עמית יצא אל הגינה עם כובע כחול קטן ונעלי סירה ירוקות. הוא אהב להסתכל על העלים, על הפרחים, ועל כל דבר שמתחבא בין האדמה והשמש.",
      imageUrl:
        "https://v3b.fal.media/files/b/0a94455d/4TWPhJpFF5vcbwk2ITupi_image.png",
    },
    {
      pageNumber: 2,
      text: "פתאום, ליד שיח נמוך, עמית מצא אבן עגולה ומבריקה. כשנגע בה בעדינות, האבן נפתחה כמו קליפה של ביצה קטנה, ומתוכה הציץ דינוזאורון ירוק עם נקודות צהובות.",
      imageUrl:
        "https://v3b.fal.media/files/b/0a94455e/5IHN-O-eVJ8bifAbk2l5o_image.png",
    },
    {
      pageNumber: 3,
      text: "עמית חייך והניח לפני הדינוזאורון עלה גדול כמו צלחת. הדינוזאורון טיפס עליו בשמחה, ועמית עזר לו להגיע אל קערית קטנה של מים נוצצים.",
      imageUrl:
        "https://v3b.fal.media/files/b/0a944562/NKznLnMh7eFSJLIxuKflu_image.png",
    },
    {
      pageNumber: 4,
      text: "אחר כך עמית הזמין את אמא ואבא, וכולם ישבו יחד על הדשא. הדינוזאורון הסתובב ביניהם, ואמא הניחה לידו פרח צהוב קטן כמו כתר.",
      imageUrl:
        "https://v3b.fal.media/files/b/0a944564/zdoAXGhYTvW94yyGX9cl4_image.png",
    },
    {
      pageNumber: 5,
      text: "בערב, הדינוזאורון נרדם בתוך קופסת קרטון רכה עם שמיכה לבנה. עמית נופף לו לשלום, וחייך כשהכוכבים הקטנים נדלקו מעל הגינה.",
      imageUrl:
        "https://v3b.fal.media/files/b/0a944565/Uy299gZvaSqW5dkaJHP88_image.png",
    },
  ],
};

const StoryDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [story] = useState<StoryData>(
    (location.state?.story as StoryData) || MOCK_STORY,
  );

  const currentPage = story.pages[currentPageIndex];
  const totalPages = story.pages.length;

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handleCreateAnother = () => {
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{story.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {story.coverText}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Left Sidebar - Page Thumbnails */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <p className="text-xs font-semibold text-muted-foreground">
              All Pages:
            </p>
            <div className="space-y-3">
              {story.pages.map((page, index) => (
                <button
                  key={page.pageNumber}
                  onClick={() => setCurrentPageIndex(index)}
                  className={`relative w-full overflow-hidden rounded-lg border-2 transition ${
                    currentPageIndex === index
                      ? "border-violet-600 shadow-lg"
                      : "border-border hover:border-violet-400"
                  }`}
                >
                  <img
                    src={page.imageUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-semibold">
                    Page {page.pageNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Current Page */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              {/* Page Counter */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Page {currentPageIndex + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPageIndex === 0}
                    className="rounded-full p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentPageIndex === totalPages - 1}
                    className="rounded-full p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Page Image */}
              <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
                <img
                  key={currentPage.pageNumber}
                  src={currentPage.imageUrl}
                  alt={`Page ${currentPage.pageNumber}`}
                  className="w-full object-cover"
                />
              </div>

              {/* Page Text */}
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-base leading-relaxed text-foreground">
                  {currentPage.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-12 flex items-center justify-between">
          <Button
            onClick={handleCreateAnother}
            size="lg"
            className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
          >
            🏠 Create Another Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
