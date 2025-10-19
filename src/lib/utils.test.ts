import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    // Test with simple strings
    expect(cn('a', 'b')).toBe('a b');
    
    // Test with conditional classes
    expect(cn('a', true && 'b', false && 'c')).toBe('a b');
    
    // Test with objects
    expect(cn('a', { b: true, c: false })).toBe('a b');
    
    // Test with arrays
    expect(cn('a', ['b', 'c'])).toBe('a b c');
    
    // Test with tailwind classes that should be merged
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });
});
