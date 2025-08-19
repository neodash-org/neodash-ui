import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSidebar } from '../useSidebar';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with collapsed state as false', () => {
    const { result } = renderHook(() => useSidebar());

    expect(result.current.isCollapsed).toBe(false);
  });

  it('should load collapsed state from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('true');

    const { result } = renderHook(() => useSidebar());

    expect(localStorageMock.getItem).toHaveBeenCalledWith('neodash-sidebar-collapsed');
    expect(result.current.isCollapsed).toBe(true);
  });

  it('should toggle collapsed state when toggleSidebar is called', () => {
    const { result } = renderHook(() => useSidebar());

    expect(result.current.isCollapsed).toBe(false);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isCollapsed).toBe(true);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isCollapsed).toBe(false);
  });

  it('should save collapsed state to localStorage when state changes', () => {
    const { result } = renderHook(() => useSidebar());

    act(() => {
      result.current.toggleSidebar();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('neodash-sidebar-collapsed', 'true');

    act(() => {
      result.current.toggleSidebar();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('neodash-sidebar-collapsed', 'false');
  });

  it('should handle invalid localStorage values', () => {
    localStorageMock.getItem.mockReturnValue('invalid');

    const { result } = renderHook(() => useSidebar());

    expect(result.current.isCollapsed).toBe(false);
  });
});
