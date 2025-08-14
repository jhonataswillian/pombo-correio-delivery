import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
          <div className="text-sm text-gray-300">
            Jhonatas Willian Nicolete © Pombo Correio
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/jhonataswillian"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jhonataswillian/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
