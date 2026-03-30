import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CharacterDetails from "@/components/story-form/CharacterDetails";
import ThemeSelector from "@/components/story-form/ThemeSelector";

interface StoryFormData {
  childName: string;
  childAge: string;
  childGender: string;
  theme: string;
  image: FileList;
}

const StoryGenerationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<StoryFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

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
    
    setIsLoading(true);
    
    // Simulate 2-3 minute loading (for demo purposes, using 2 seconds)
    setTimeout(() => {
      console.log("Form Data:", {
        childName: data.childName,
        childAge: data.childAge,
        childGender: data.childGender,
        theme: data.theme,
        image: data.image[0],
      });
      
      // Navigate to story display
      navigate("/story");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Create Your Book</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Follow the steps to create your personalized children's book
        </p>
      </div>

      {/* Character Details Section */}
      <section className="rounded-lg border border-border bg-card p-8">
        <CharacterDetails register={register} watch={watch} errors={errors} />
      </section>

      {/* Theme Selector Section */}
      <section className="rounded-lg border border-border bg-card p-8">
        <ThemeSelector register={register} watch={watch} errors={errors} />
      </section>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={!isValid || isLoading}
          className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating Your Story... ✨" : "Create Story ✨"}
        </Button>
      </div>
    </form>
  );
};

export default StoryGenerationForm;
