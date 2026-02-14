import { create } from 'zustand';
import { reportApi } from '@services/api';
import type { DashboardAnalytics, ExamResult } from '@types/index';

interface ReportState {
  analytics: DashboardAnalytics | null;
  reports: ExamResult[];
  fetchAnalytics: () => Promise<void>;
  fetchReports: () => Promise<void>;
}

export const useReportStore = create<ReportState>((set) => ({
  analytics: null,
  reports: [],
  fetchAnalytics: async () => {
    const analytics = await reportApi.getAnalytics();
    set({ analytics });
  },
  fetchReports: async () => {
    const reports = await reportApi.getReports();
    set({ reports });
  }
}));
