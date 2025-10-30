import TableToolbar from './TableToolbar';

export default {
  title: 'Uniform Web/TableToolbar',
  component: TableToolbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Registrants',
    filterValue: 'All',
    searchPlaceholder: 'Search for…',
    showFilter: true,
    showSearch: true,
    showDownload: true,
    onFilterChange: (value) => console.log('Filter changed:', value),
    onSearch: (value) => console.log('Search:', value),
    onDownload: () => console.log('Download clicked'),
  },
};

export const NoFilter = {
  args: {
    title: 'Registrants',
    showFilter: false,
    showSearch: true,
    showDownload: true,
  },
};

export const SearchOnly = {
  args: {
    title: 'Registrants',
    showFilter: false,
    showSearch: true,
    showDownload: false,
  },
};

export const MinimalToolbar = {
  args: {
    title: 'Registrants',
    showFilter: false,
    showSearch: false,
    showDownload: false,
  },
};

