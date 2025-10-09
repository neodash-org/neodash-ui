import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarHeader from '../SidebarHeader';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'app.name': 'NeoDash',
        'actions.expandSidebar': 'Expand sidebar',
        'actions.collapseSidebar': 'Collapse sidebar',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

describe('SidebarHeader', () => {
  const mockToggleSidebar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when sidebar is expanded', () => {
    beforeEach(() => {
      render(<SidebarHeader isCollapsed={false} toggleSidebar={mockToggleSidebar} />);
    });

    it('should render the toggle button', () => {
      expect(screen.getByTestId('sidebar-toggle-button')).toBeInTheDocument();
    });

    it('should show collapse icon when expanded', () => {
      expect(screen.getByTestId('collapse-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('expand-icon')).not.toBeInTheDocument();
    });

    it('should show the NeoDash text logo', () => {
      expect(screen.getByTestId('sidebar-logo-text')).toBeInTheDocument();
      expect(screen.getByText('NeoDash')).toBeInTheDocument();
    });

    it('should not show the icon logo', () => {
      expect(screen.queryByTestId('sidebar-logo-icon')).not.toBeInTheDocument();
    });

    it('should call toggleSidebar when button is clicked', () => {
      fireEvent.click(screen.getByTestId('sidebar-toggle-button'));
      expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    });

    it('should have correct aria-label for collapse action', () => {
      const button = screen.getByTestId('sidebar-toggle-button');
      expect(button).toHaveAttribute('aria-label', 'Collapse sidebar');
    });
  });

  describe('when sidebar is collapsed', () => {
    beforeEach(() => {
      render(<SidebarHeader isCollapsed={true} toggleSidebar={mockToggleSidebar} />);
    });

    it('should show expand icon when collapsed', () => {
      expect(screen.getByTestId('expand-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('collapse-icon')).not.toBeInTheDocument();
    });

    it('should show the icon logo', () => {
      expect(screen.getByTestId('sidebar-logo-icon')).toBeInTheDocument();
      expect(screen.getByAltText('NeoDash')).toBeInTheDocument();
    });

    it('should not show the text logo', () => {
      expect(screen.queryByTestId('sidebar-logo-text')).not.toBeInTheDocument();
      expect(screen.queryByText('NeoDash')).not.toBeInTheDocument();
    });

    it('should have correct aria-label for expand action', () => {
      const button = screen.getByTestId('sidebar-toggle-button');
      expect(button).toHaveAttribute('aria-label', 'Expand sidebar');
    });
  });

  describe('accessibility', () => {
    it('should have proper button role', () => {
      render(<SidebarHeader isCollapsed={false} toggleSidebar={mockToggleSidebar} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have proper aria-label', () => {
      render(<SidebarHeader isCollapsed={false} toggleSidebar={mockToggleSidebar} />);
      const button = screen.getByRole('button', { name: /collapse sidebar/i });
      expect(button).toBeInTheDocument();
    });
  });
});
