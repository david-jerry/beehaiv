import { useMemo } from "react";

/**
 * Custom hook to filter blog posts by category and return the first three.
 * @param {PostProp[]} posts - The list of blog posts.
 * @param {boolean} featured - The category to filter by.
 * @param {number} filter - The amount of posts to return.
 * @returns {PostProp[]} - The first three posts of the filtered list.
 */
export const useFilteredPosts = (
  posts: PostProp[],
  featured: boolean,
  filter: number
): PostProp[] => {
  // Use useMemo to filter and limit posts to the first 3
  const filteredPosts = useMemo(() => {
    // Filter posts by the specified category
    const filtered = posts.filter((post) => post.featured === featured);

    // Return the first 3 posts from the filtered list
    return filtered.slice(0, filter);
  }, [posts, filter, featured]);

  return filteredPosts;
};

/**
 * Custom hook to get all blog posts.
 * @param {PostProp[]} posts - The list of blog posts.
 * @returns {PostProp[]} - The first three posts of the filtered list.
 */
export const useAllPosts = (posts: PostProp[]): PostProp[] => {
  // Use useMemo to filter and limit posts to the first 3
  const cachedPosts = useMemo(() => {
    // Filter posts by the specified category
    return posts;
  }, [posts]);

  return cachedPosts;
};

/**
 * Custom hook to get all blog posts filtered by a particular date.
 * @param {PostProp[]} posts - The list of blog posts.
 * @param {string} publishedDate - The date to filter with.
 * @param {number} filter - The amount of posts to return.
 * @returns {PostProp[]} - The first three posts of the filtered list.
 */
export const useGetPostsByDate = (
  posts: PostProp[],
  publishedDate: string,
  filter: number
): PostProp[] => {
  // Use useMemo to filter and limit posts to the first 3
  const cachedPosts = useMemo(() => {
    // Filter posts by the specified category
    const filteredPosts = posts.filter(
      (post) => post.publishedDate === publishedDate
    );
    return filteredPosts.slice(0, 10);
  }, [posts, publishedDate]);

  return cachedPosts;
};

export const useGetCard = (
  user: User
) => {
  const cachedCards = useMemo(() => {
    const cards: Card[] = [];
    if (user !== null) {
      user.business_profiles.forEach((profile) => {
        if (profile.bank_account && profile.bank_account.card) {
          const card = {
            bal: profile.bank_account.balance,
            ...profile.bank_account.card,
          };
          cards.push(card);
        }
      });
    }
    return cards;
  }, [user]);

  return cachedCards;
}