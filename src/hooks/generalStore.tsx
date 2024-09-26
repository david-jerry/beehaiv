import { create } from "zustand";

const useGeneralStore = create((set, get) => ({
  opened: false,
  getStartedEmail: null,
  openSubmenu: false,
  mobileNavOpened: false,
  content: null,
  basicData: undefined,
  openPin: false,
  showDashMobileNav: false,

  setGetStartedEmail: (email: string | null) => set({ getStartedEmail: email }),
  setMobileNavOpened: (status: boolean) => set({ mobileNavOpened: status }),
  setShowDashMobileNav: (status: boolean) => set({ showDashMobileNav: status }),
  setOpenPin: (status: boolean) => set({ openPin: status }),
  setContent: (status: any) => set({ content: status }),
  setOpened: (status: boolean) => set({ opened: status }),
  setOpenSubmenu: (status: boolean) => set({ openSubmenu: status }),
  setBasicData: (data: any) =>
    set((state: any) => ({
      basicData: { ...state.basicData, ...data },
    })),

  resetMenu: () => {
    set({
      opened: false,
      content: null,
      mobileNavOpened: false,
      openSubmenu: false,
    });
  },
}));

export default useGeneralStore;
