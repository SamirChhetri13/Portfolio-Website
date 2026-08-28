import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitFork, Star, BookOpen, Users, FolderDot } from 'lucide-react';
import { fetchGitHubProfile, fetchGitHubRepos } from '../services/api';

export default function GitHubActivity() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGitHubData = async () => {
      try {
        setLoading(true);
        const [profileData, reposData] = await Promise.all([
          fetchGitHubProfile(),
          fetchGitHubRepos(),
        ]);
        setProfile(profileData);
        setRepos(reposData);
      } catch (error) {
        console.error('Error fetching GitHub info:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getGitHubData();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section 
      id="github" 
      className="py-24 bg-white dark:bg-darkBg text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">GitHub Activity</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Real-time activity and stats powered by the GitHub public API.
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-gray-100 dark:bg-darkCard rounded-xl border border-gray-200/50 dark:border-gray-800/80" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-40 bg-gray-100 dark:bg-darkCard rounded-xl border border-gray-200/50 dark:border-gray-800/80" />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >
            {/* Stats Dashboard */}
            {profile && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <motion.div 
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 flex items-center space-x-4 shadow-sm"
                >
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                    <FolderDot className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold">{profile.public_repos}</span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Public Repos</span>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 flex items-center space-x-4 shadow-sm"
                >
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold">{profile.followers}</span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Followers</span>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 flex items-center space-x-4 shadow-sm"
                >
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                    <GitPullRequest className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold">{profile.following}</span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Following</span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Repos Grid */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-center md:text-left flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <span>Recent Repositories</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-xl bg-gray-50 dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 shadow-sm hover:shadow-md flex flex-col justify-between group transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-1">
                        {repo.name}
                      </h4>
                      <p className="text-xs text-gray-505 dark:text-gray-450 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
                      {repo.language && (
                        <span className="px-2.5 py-0.5 rounded bg-gray-200/50 dark:bg-gray-800/50 font-semibold">
                          {repo.language}
                        </span>
                      )}
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <GitFork className="w-3.5 h-3.5 text-blue-500" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
