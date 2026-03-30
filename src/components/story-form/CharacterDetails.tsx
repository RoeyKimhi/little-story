import { Upload } from "lucide-react";
import type { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";

interface StoryFormData {
  childName: string;
  childAge: string;
  childGender: string;
  theme: string;
  image: FileList;
}

interface CharacterDetailsProps {
  register: UseFormRegister<StoryFormData>;
  watch: UseFormWatch<StoryFormData>;
  errors: FieldErrors<StoryFormData>;
}

const CharacterDetails = ({ register, watch, errors }: CharacterDetailsProps) => {
  const imageFile = watch("image");
  const previewUrl = imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Main Character</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Photo</label>
          <label className={`flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition ${errors.image ? 'border-red-500 bg-red-50' : 'border-border bg-muted/30 hover:bg-muted/50'}`}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Drag and drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              {...register("image", { required: "Photo is required" })}
            />
          </label>
          {errors.image && <p className="mt-1 text-xs text-red-500">Photo is required</p>}
        </div>

        {/* Character Details Form */}
        <div className="space-y-4">
          {/* Character Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Character Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter character name"
              className={`w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 ${errors.childName ? 'border-red-500 focus:ring-red-600' : 'border-border focus:ring-violet-600'}`}
              {...register("childName", { required: "Character name is required" })}
            />
            {errors.childName && <p className="mt-1 text-xs text-red-500">Character name is required</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className={`w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 ${errors.childAge ? 'border-red-500 focus:ring-red-600' : 'border-border focus:ring-violet-600'}`}
              {...register("childAge", { required: "Age is required" })}
            />
            {errors.childAge && <p className="mt-1 text-xs text-red-500">Age is required</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Male", "Female"].map((option) => (
                <label
                  key={option}
                  className="flex items-center justify-center rounded-lg border-2 border-border bg-background px-4 py-2 cursor-pointer transition hover:bg-muted has-[:checked]:border-violet-600 has-[:checked]:bg-violet-50"
                >
                  <input
                    type="radio"
                    value={option}
                    className="hidden"
                    {...register("childGender", { required: "Gender is required" })}
                  />
                  <span className="text-sm font-medium">{option}</span>
                </label>
              ))}
            </div>
            {errors.childGender && <p className="mt-1 text-xs text-red-500">Gender is required</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
