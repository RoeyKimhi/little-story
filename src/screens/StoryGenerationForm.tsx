import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import CharacterDetails from "@/components/story-form/CharacterDetails";
import ThemeSelector from "@/components/story-form/ThemeSelector";
import { loadCurrentStory } from "@/lib/storySession";
import type { CreateStoryLocationState } from "@/types/createStory";

interface StoryFormData {
  childName: string;
  childAge: string;
  childGender: string;
  theme: string;
  image: FileList;
}

const StoryGenerationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const savedStory = loadCurrentStory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<StoryFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const error = (location.state as CreateStoryLocationState | null)?.error;

    if (!error) {
      return;
    }

    setErrorMessage(error);
    navigate("/create", { replace: true, state: {} });
  }, [location.state, navigate]);

  const onSubmit = (data: StoryFormData) => {
    if (
      !data.childName ||
      !data.childAge ||
      !data.childGender ||
      !data.theme ||
      !data.image?.[0]
    ) {
      return;
    }

    setErrorMessage(null);

    navigate("/creating", {
      state: {
        payload: {
          childName: data.childName,
          childAge: data.childAge,
          childGender: data.childGender,
          theme: data.theme,
          image: data.image[0],
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Create Your Book</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Follow the steps to create your personalized children's book
        </p>
      </div>

      {savedStory && (
        <div
          dir="rtl"
          className="flex flex-col items-center gap-3 rounded-lg border border-violet-200 bg-violet-50 px-4 py-4 text-center"
        >
          <p className="text-sm text-violet-900">
            יש לך ספר שכבר נוצר: <strong>{savedStory.title}</strong>
          </p>
          <Button
            type="button"
            variant="outline"
            className="gap-2 rounded-full"
            onClick={() =>
              navigate("/story", { state: { story: savedStory }, replace: true })
            }
          >
            <BookOpen className="size-4" />
            המשיכי לצפייה בספר
          </Button>
        </div>
      )}

      <section className="rounded-lg border border-border bg-card p-8">
        <CharacterDetails register={register} watch={watch} errors={errors} />
      </section>

      <section className="rounded-lg border border-border bg-card p-8">
        <ThemeSelector register={register} watch={watch} errors={errors} />
      </section>

      {errorMessage && (
        <div
          role="alert"
          dir="rtl"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive"
        >
          {errorMessage}
        </div>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={!isValid}
          className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create Story ✨
        </Button>
      </div>
    </form>
  );
};

export default StoryGenerationForm;
