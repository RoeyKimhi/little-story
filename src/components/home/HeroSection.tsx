const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="flex items-center justify-center gap-3">
        <img src="/logo.svg" alt="LittleStory" className="h-12 w-12" />
        <h1 className="text-5xl font-black">LittleStory</h1>
      </div>
      <p className="max-w-2xl text-xl text-muted-foreground">
        Create a magical personalized story for your child
      </p>
    </section>
  );
};

export default HeroSection;
