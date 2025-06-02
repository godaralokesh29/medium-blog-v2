import { Link, useLocation } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { Logout } from "./Logout";
// import { useBlogs } from "../hooks";


export const Appbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/blogs"
              className="flex items-center space-x-2 text-2xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
            >
              <svg className="w-8 h-8" viewBox="0 0 256 256" fill="currentColor">
                <path d="M72.2009141,1.42108547e-14 C112.076502,1.42108547e-14 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,1.42108547e-14 72.2009141,1.42108547e-14 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 L223.603538,72.6964154 C223.603538,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z" />
              </svg>
              <span>Tech Talks</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/blogs"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive("/blogs")
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Home
              </Link>
              <Link
                to="/publish"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive("/publish")
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Write
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/publish">
              <button className="btn-primary text-sm font-medium">
                New Blog
              </button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar size="big" name="Ahmed" />
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
