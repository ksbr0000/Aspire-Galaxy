import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analyst"]
    },
    {
        filterType: "Salary",
        array: [
            { range: [0, 500000], label: "Below 5,00,000" },
            { range: [500001, 1000000], label: "5,00,001 - 10,00,000" },
            { range: [1000001, Infinity], label: "Above 10,00,000" }
        ]
    }
];

const FilterCard = ({ onFilterChange, selectedFilters }) => {
    const { selectedLocation, selectedIndustry, selectedSalaryRange } = selectedFilters;

    const handleToggleFilter = (filterType, value) => {
        let newSelectedFilters = {
            selectedSalaryRange,
            selectedLocation,
            selectedIndustry
        };

        if (filterType === "Salary") {
            newSelectedFilters.selectedSalaryRange = selectedSalaryRange && JSON.stringify(selectedSalaryRange) === JSON.stringify(value) ? null : value;
        } else if (filterType === "Location") {
            newSelectedFilters.selectedLocation = selectedLocation === value ? null : value;
        } else if (filterType === "Industry") {
            newSelectedFilters.selectedIndustry = selectedIndustry === value ? null : value;
        }

        onFilterChange(newSelectedFilters);
    };

    return (
        <div className='w-full bg-white  p-4 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index}>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    <RadioGroup>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            const isSelected = (data.filterType === "Salary" && selectedSalaryRange && JSON.stringify(selectedSalaryRange) === JSON.stringify(item.range)) ||
                                               (data.filterType === "Location" && selectedLocation === item) ||
                                               (data.filterType === "Industry" && selectedIndustry === item);

                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-1 '>
                                    <RadioGroupItem
                                        value={data.filterType === "Salary" ? JSON.stringify(item.range) : item}
                                        id={itemId}
                                        checked={isSelected}
                                        onClick={() => handleToggleFilter(data.filterType, data.filterType === "Salary" ? item.range : item)}
                                    />
                                    <Label htmlFor={itemId}>{data.filterType === "Salary" ? item.label : item}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
