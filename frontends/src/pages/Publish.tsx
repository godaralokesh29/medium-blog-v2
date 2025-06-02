import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to publish blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Appbar />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Create a new blog</h1>
            <p className="text-[var(--muted-foreground)]">
              Share your thoughts and ideas with the world
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
                className="input-field text-xl font-semibold"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                className="input-field min-h-[400px] resize-y"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate("/blogs")}
                className="btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
