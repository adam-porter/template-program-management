import RegistrationsTable from './RegistrationsTable';

export default {
  title: 'Uniform Web/RegistrationsTable',
  component: RegistrationsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockRegistrations = [
  {
    title: 'U17 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 0,
    enabled: true
  }
];

const mockMultipleRegistrations = [
  {
    title: 'U18 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 2,
    enabled: true
  },
  {
    title: 'U17 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 2,
    enabled: true
  },
  {
    title: 'U16 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 2,
    enabled: true
  },
  {
    title: 'U15 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 0,
    enabled: true
  },
  {
    title: 'U14 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 0,
    enabled: true
  },
  {
    title: 'U13 Girls',
    count: 0,
    totalCollected: '$0.00',
    refunded: '$0.00',
    outstanding: '$0.00',
    listPrice: '$1,499.00',
    capacity: '0/16',
    teams: 0,
    enabled: true
  }
];

// Single row example
export const SingleRow = {
  args: {
    registrations: mockRegistrations,
    onToggleRegistration: (registration, index) => {
      console.log('Toggle registration:', registration, index);
    },
    onRegistrationClick: (registration) => {
      console.log('Registration clicked:', registration);
    }
  },
};

// Multiple rows example
export const MultipleRows = {
  args: {
    registrations: mockMultipleRegistrations,
    onToggleRegistration: (registration, index) => {
      console.log('Toggle registration:', registration, index);
    },
    onRegistrationClick: (registration) => {
      console.log('Registration clicked:', registration);
    }
  },
};

// With some disabled
export const MixedStates = {
  args: {
    registrations: [
      {
        title: 'U17 Girls',
        count: 0,
        totalCollected: '$0.00',
        refunded: '$0.00',
        outstanding: '$0.00',
        listPrice: '$1,499.00',
        capacity: '0/16',
        teams: 0,
        enabled: true
      },
      {
        title: 'U16 Girls',
        count: 0,
        totalCollected: '$0.00',
        refunded: '$0.00',
        outstanding: '$0.00',
        listPrice: '$1,499.00',
        capacity: '0/16',
        teams: 0,
        enabled: false
      },
      {
        title: 'U15 Girls',
        count: 0,
        totalCollected: '$0.00',
        refunded: '$0.00',
        outstanding: '$0.00',
        listPrice: '$1,499.00',
        capacity: '0/16',
        teams: 0,
        enabled: true
      }
    ],
    onToggleRegistration: (registration, index) => {
      console.log('Toggle registration:', registration, index);
    },
    onRegistrationClick: (registration) => {
      console.log('Registration clicked:', registration);
    }
  },
};

