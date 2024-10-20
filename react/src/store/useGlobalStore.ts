import { create } from 'zustand';

interface GlobalState {
  drawerVisiable: boolean;
}

export const useGlobalStore = create<GlobalState>(() => ({
  drawerVisiable: false,
}));

export const setupVisiable = (bool: boolean) => {
  useGlobalStore.setState({ drawerVisiable: bool });
};
