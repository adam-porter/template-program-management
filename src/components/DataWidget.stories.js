import DataWidget from './DataWidget';

export default {
  title: 'Uniform Web/DataWidget',
  component: DataWidget,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockRows = [
  { label: "Row Label", value: "Row Value", hasButton: false },
  { label: "Row Label", value: "Row Value", hasButton: false },
  { label: "Row Label", value: "Row Value", hasButton: false },
  { label: "Row Label", value: "Row Value", hasButton: false },
  { label: "Row Label", value: "Row Value", hasButton: false }
];

// Medium size variant (44px display, bold italic)
export const Medium = {
  args: {
    size: 'medium',
    label: 'Total Athletes',
    value: '150',
    rows: mockRows,
  },
};

// Small size variant (24px display, bold italic)
export const Small = {
  args: {
    size: 'small',
    label: 'Revenue',
    value: '$45,000',
    rows: mockRows,
  },
};

// Extra-small size variant (20px display, bold)
export const ExtraSmall = {
  args: {
    size: 'extra-small',
    label: 'Registrations',
    value: '87',
    rows: mockRows,
  },
};

// With avatar and subheader
export const WithAvatarAndSubheader = {
  args: {
    size: 'medium',
    label: 'Team Captain',
    value: '150',
    avatar: 'https://i.pravatar.cc/112?img=33',
    subheader: 'Sub header · Sub header',
    rows: mockRows,
  },
};

// With real data
export const WithRealData = {
  args: {
    size: 'medium',
    label: 'Team Revenue',
    value: '$45,320',
    avatar: 'https://i.pravatar.cc/112?img=65',
    subheader: 'Paid · Outstanding',
    rows: [
      { label: "Paid", value: "$40,000", hasButton: false },
      { label: "Outstanding", value: "$5,000", hasButton: false },
      { label: "Refunded", value: "$500", hasButton: false },
      { label: "Pending", value: "$2,000", hasButton: false },
      { label: "Total This Year", value: "$45,320", hasButton: false }
    ],
  },
};

// With action buttons in rows
export const WithRowButtons = {
  args: {
    size: 'medium',
    label: 'Active Players',
    value: '150',
    rows: [
      { label: "Varsity", value: "45", hasButton: true },
      { label: "JV", value: "38", hasButton: true },
      { label: "Freshman", value: "42", hasButton: true },
      { label: "Reserves", value: "25", hasButton: true },
      { label: "Total", value: "150", hasButton: false }
    ],
  },
};

// All three sizes side by side
export const AllSizes = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: 'var(--u-space-three, 48px)',
      width: '100%'
    }}>
      <DataWidget
        size="medium"
        label="Medium Size"
        value="999"
        rows={mockRows}
      />
      <DataWidget
        size="small"
        label="Small Size"
        value="999"
        rows={mockRows}
      />
      <DataWidget
        size="extra-small"
        label="Extra-Small Size"
        value="999"
        rows={mockRows}
      />
    </div>
  ),
};

// Dashboard layout (4 widgets)
export const DashboardLayout = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: 'var(--u-space-three, 48px)',
      width: '100%'
    }}>
      <DataWidget
        size="medium"
        label="Total Athletes"
        value="150"
        avatar="https://i.pravatar.cc/112?img=33"
        subheader="Active · This Season"
        rows={[
          { label: "Active", value: "120", hasButton: true },
          { label: "Inactive", value: "30", hasButton: true },
          { label: "New This Week", value: "5", hasButton: true },
          { label: "Pending", value: "10", hasButton: true },
          { label: "Total This Season", value: "150", hasButton: false }
        ]}
      />
      <DataWidget
        size="medium"
        label="Revenue"
        value="$45,000"
        avatar="https://i.pravatar.cc/112?img=65"
        subheader="Paid · Outstanding"
        rows={[
          { label: "Paid", value: "$40,000", hasButton: true },
          { label: "Outstanding", value: "$5,000", hasButton: true },
          { label: "Refunded", value: "$500", hasButton: true },
          { label: "Pending", value: "$2,000", hasButton: true },
          { label: "Total", value: "$45,000", hasButton: false }
        ]}
      />
      <DataWidget
        size="medium"
        label="Programs"
        value="12"
        avatar="https://i.pravatar.cc/112?img=14"
        subheader="Active · Draft"
        rows={[
          { label: "Active", value: "10", hasButton: true },
          { label: "Draft", value: "2", hasButton: true },
          { label: "Archived", value: "3", hasButton: true },
          { label: "New This Month", value: "1", hasButton: false },
          { label: "Total", value: "12", hasButton: false }
        ]}
      />
      <DataWidget
        size="medium"
        label="Events"
        value="24"
        avatar="https://i.pravatar.cc/112?img=56"
        subheader="Upcoming · Completed"
        rows={[
          { label: "Upcoming", value: "8", hasButton: true },
          { label: "Completed", value: "16", hasButton: true },
          { label: "Canceled", value: "2", hasButton: true },
          { label: "This Week", value: "3", hasButton: false },
          { label: "Total", value: "24", hasButton: false }
        ]}
      />
    </div>
  ),
};

