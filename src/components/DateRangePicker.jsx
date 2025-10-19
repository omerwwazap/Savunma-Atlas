import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DateRangePicker = ({ 
  dateRange, 
  setDateRange, 
  placeholder = "Select date range",
  className,
  align = "start",
  side = "bottom",
  calendarClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    if (!dateRange?.from) {
      setDateRange({ from: date, to: undefined });
    } else if (dateRange.from && !dateRange.to) {
      const newRange = 
        date < dateRange.from
          ? { from: date, to: dateRange.from }
          : { from: dateRange.from, to: date };
      
      setDateRange(newRange);
      setIsOpen(false);
    } else {
      setDateRange({ from: date, to: undefined });
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setDateRange(undefined);
  };

  const formatDate = (date) => {
    return format(date, 'LLL dd, y');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !dateRange?.from && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-6 w-6 p-0 rounded-full"
                  onClick={handleClear}
                >
                  ✕
                </Button>
              </>
            ) : (
              <>
                {formatDate(dateRange.from)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-6 w-6 p-0 rounded-full"
                  onClick={handleClear}
                >
                  ✕
                </Button>
              </>
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align} side={side}>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          className={cn("rounded-md border", calendarClassName)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
