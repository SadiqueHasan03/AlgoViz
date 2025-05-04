import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, Code, ArrowRight, Play, Loader2 } from "lucide-react"; // Added Loader2
import { useToast } from "@/hooks/use-toast"; // Assuming this is the correct path

// Interface for a single lesson *within* a category for display
interface LessonDisplayInfo {
  title: string;
  slug: string;
  visualizerPath?: string;
}

// Interface for a category containing lessons
interface LessonCategory {
  title: string; // Category title
  description: string; // Category description (optional, can be generated)
  icon: React.ElementType; // Use React.ElementType for component types
  iconColor: string;
  bgClass: string;
  lessons: LessonDisplayInfo[]; // Array of lessons belonging to this category
}

// Interface matching the data structure returned by GET /api/lessons
interface ApiLesson {
  slug: string;
  title: string;
  category: string;
  description: string; // We might use this for category description later
  visualizerPath?: string;
}


const Lessons = () => {
  // State holds the processed categories ready for display
  const [lessonCategories, setLessonCategories] = useState<LessonCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndGroupLessons = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/lessons`, {
          // mode: 'cors', // Usually not needed for simple GET if server CORS is configured
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch lessons: ${response.statusText} (${response.status})`);
        }

        // Expecting an array of ApiLesson objects
        const flatLessonsData: ApiLesson[] = await response.json();

        if (!Array.isArray(flatLessonsData)) {
          console.error("Invalid data format received:", flatLessonsData);
          throw new Error('Invalid lessons data format received from API.');
        }

        // --- Grouping Logic ---
        const categoriesMap = new Map<string, LessonCategory>();

        flatLessonsData.forEach((lesson: ApiLesson) => {
          // Basic validation for each lesson item from API
          if (!lesson.slug || !lesson.title || !lesson.category) {
            console.warn("Skipping invalid lesson item from API:", lesson);
            return; // Skip this invalid lesson
          }

          const categoryTitle = lesson.category;

          // If category doesn't exist in map, create it
          if (!categoriesMap.has(categoryTitle)) {
            // Assign default/placeholder details for the category
            // You could potentially have a predefined map for icons/colors based on categoryTitle
            categoriesMap.set(categoryTitle, {
              title: categoryTitle,
              description: `Explore concepts related to ${categoryTitle}.`, // Generate a simple description
              icon: BookOpen, // Default icon
              iconColor: "text-blue-500", // Default color
              bgClass: "bg-blue-50", // Default background
              lessons: [], // Initialize empty lessons array
            });
          }

          // Add the current lesson to the correct category's lesson list
          // Only include fields needed for LessonDisplayInfo
          const category = categoriesMap.get(categoryTitle);
          if (category) { // Type guard
             category.lessons.push({
                title: lesson.title,
                slug: lesson.slug,
                visualizerPath: lesson.visualizerPath,
             });
          }
        });

        // Convert the Map values (our categories) into an array
        const groupedCategories = Array.from(categoriesMap.values());
        // --- End Grouping Logic ---

        setLessonCategories(groupedCategories);

      } catch (error: any) { // Catch specific error types if needed
        console.error("Error fetching and processing lessons:", error);
        toast({
          title: "Error Loading Lessons",
          description: error.message || "Could not fetch lessons from the server. Please try again later.",
          variant: "destructive"
        });
         setLessonCategories([]); // Clear categories on error
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchAndGroupLessons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]); // Add toast as a dependency

  return (
    <div className="container py-12 animate-fade-in">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Algorithm Lessons</h1>
        <p className="text-xl text-muted-foreground">
          Explore our comprehensive curriculum covering essential algorithm concepts and techniques.
          Learn at your own pace through interactive lessons and examples.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Loading lessons...</p>
        </div>
      ) : lessonCategories.length === 0 ? (
         <div className="text-center py-16">
            <p className="text-muted-foreground">No lessons available at the moment, or an error occurred.</p>
         </div>
      ) : (
        <div className="space-y-16">
          {lessonCategories.map((category) => {
            // Check if Icon is a valid component type before rendering
            const Icon = typeof category.icon === 'function' ? category.icon : BookOpen; // Fallback icon

            return (
              <div key={category.title} className="space-y-8"> {/* Use category title as key */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${category.bgClass}`}>
                    <Icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{category.title}</h2> {/* Adjusted font weight */}
                    <p className="text-muted-foreground mt-1">{category.description}</p> {/* Added margin top */}
                  </div>
                </div>

                {category.lessons.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.lessons.map((lesson) => (
                      <Card key={lesson.slug} className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group flex flex-col justify-between"> {/* Use theme bg-card, ensure flex col */}
                        <div className="p-6">
                          <h3 className="text-lg font-medium mb-4 line-clamp-2">{lesson.title}</h3> {/* Added line-clamp */}
                          <div className="flex gap-3 flex-wrap mt-auto pt-4"> {/* Pushed buttons down */}
                            <Button asChild size="sm" className="group-hover:-translate-y-0.5 transition-transform">
                              <Link to={`/lessons/${lesson.slug}`} className="flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Start Lesson
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </Button>
                            {lesson.visualizerPath && (
                              <Button variant="secondary" size="sm" asChild className="group-hover:-translate-y-0.5 transition-transform">
                                <Link to={lesson.visualizerPath} className="flex items-center">
                                  <Play className="mr-2 h-4 w-4" />
                                  Visualizer
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="h-1.5 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-300 mt-auto"></div> {/* Use theme colors, ensure mt-auto */}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground pl-12">No lessons found in this category.</p> // Added padding to align
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Lessons;