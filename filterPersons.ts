type User = {
  id: number;
  name: string;
  email: string;
  type: 'user';
};

type Admin = {
  id: number;
  name: string;
  role: string;
  type: 'admin';
};

type Person = User | Admin;

// Utility type to remove the `type` field
type Criteria<T> = Partial<Omit<T, 'type'>>;

function filterPersons<T extends 'user' | 'admin'>(
  personType: T,
  criteria: Criteria<T extends 'user' ? User : Admin>,
  persons: Person[]
): (T extends 'user' ? User : Admin)[] {
  return persons.filter((person) => {
    if (person.type !== personType) return false;

    return Object.entries(criteria).every(([key, value]) => {
      return (person as any)[key] === value;
    });
  }) as any;
}

// Example usage:
const persons: Person[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', type: 'user' },
  { id: 2, name: 'Bob', role: 'Manager', type: 'admin' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', type: 'user' },
];

const filteredUsers = filterPersons('user', { name: 'Alice' }, persons);
console.log(filteredUsers); // Returns Alice's data

const filteredAdmins = filterPersons('admin', { role: 'Manager' }, persons);
console.log(filteredAdmins); // Returns Bob's data
