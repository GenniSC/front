interface NavItem {
  roles: string[];
  children?: NavItem[];
  // other properties
}

export function filterNavDataByRole(navItems: NavItem[], role: string): NavItem[] {
  return navItems.reduce((filteredItems: NavItem[], item: NavItem) => {
    if (item.roles && item.roles.includes(role)) {
      const newItem = { ...item };
      filteredItems.push(newItem);
    }
    return filteredItems;
  }, [] as NavItem[]);
}
