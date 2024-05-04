// @ts-nocheck
import PropTypes from 'prop-types'
import { DataTable } from '../../components/oven2'
import { useState } from 'react'
import { Stack } from '@mui/material'

export default {
    title: "Data Table",
    component: DataTable,
}

const Template = args => {
    const [callback] = useState({})

    return (
        <Stack style={{width : 'calc(100vw - 100px)' , height : 'calc(100vh - 100px)', position : 'relative'}} >
            <DataTable {...args} callback={callback} />
        </Stack>
    )
}

export const AgGridCustomTable = Template.bind({})

AgGridCustomTable.args={
    tablename : 'agGridCustom' ,
    tid:"1211" ,
    hiddenColumns : [] ,
    dataset: [
        { id: 1, label: 'agGridCustom1', creationDate: '2024', carModel: 'Toyota Camry', price: 25000, address: '123 Main St' },
        { id: 2, label: 'agGridCustom2', creationDate: '2025', carModel: 'Honda Accord', price: 27000, address: '456 Elm St' },
        { id: 3, label: 'agGridCustom3', creationDate: '2026', carModel: 'Ford Mustang', price: 35000, address: '789 Oak St' },
        { id: 4, label: 'agGridCustom4', creationDate: '2027', carModel: 'Chevrolet Silverado', price: 40000, address: '234 Pine St' },
        { id: 5, label: 'agGridCustom5', creationDate: '2028', carModel: 'BMW X5', price: 55000, address: '567 Maple St' },
        { id: 6, label: 'agGridCustom6', creationDate: '2029', carModel: 'Tesla Model 3', price: 45000, address: '890 Cedar St' },
        { id: 7, label: 'agGridCustom7', creationDate: '2030', carModel: 'Mercedes-Benz C-Class', price: 60000, address: '345 Oak St' },
        { id: 8, label: 'agGridCustom8', creationDate: '2031', carModel: 'Audi A4', price: 50000, address: '678 Elm St' },
        { id: 9, label: 'agGridCustom9', creationDate: '2032', carModel: 'Lexus RX', price: 48000, address: '901 Main St' },
        { id: 10, label: 'agGridCustom10', creationDate: '2033', carModel: 'Subaru Outback', price: 35000, address: '234 Cedar St' },
        { id: 11, label: 'agGridCustom11', creationDate: '2034', carModel: 'Toyota Prius', price: 30000, address: '567 Pine St' },
        { id: 12, label: 'agGridCustom12', creationDate: '2035', carModel: 'Honda Civic', price: 25000, address: '890 Elm St' },
        { id: 13, label: 'agGridCustom13', creationDate: '2036', carModel: 'Ford F-150', price: 45000, address: '123 Maple St' },
        { id: 14, label: 'agGridCustom14', creationDate: '2037', carModel: 'Chevrolet Tahoe', price: 60000, address: '456 Cedar St' },
        { id: 15, label: 'agGridCustom15', creationDate: '2038', carModel: 'BMW 3 Series', price: 52000, address: '789 Oak St' },
        { id: 16, label: 'agGridCustom16', creationDate: '2039', carModel: 'Tesla Model S', price: 80000, address: '234 Pine St' },
        { id: 17, label: 'agGridCustom17', creationDate: '2040', carModel: 'Mercedes-Benz E-Class', price: 70000, address: '567 Elm St' },
        { id: 18, label: 'agGridCustom18', creationDate: '2041', carModel: 'Audi Q5', price: 55000, address: '890 Maple St' },
        { id: 19, label: 'agGridCustom19', creationDate: '2042', carModel: 'Lexus NX', price: 45000, address: '123 Cedar St' },
        { id: 20, label: 'agGridCustom20', creationDate: '2043', carModel: 'Subaru Forester', price: 37000, address: '456 Oak St' },
        { id: 21, label: 'agGridCustom21', creationDate: '2044', carModel: 'Toyota RAV4', price: 32000, address: '789 Elm St' },
        { id: 22, label: 'agGridCustom22', creationDate: '2045', carModel: 'Honda CR-V', price: 29000, address: '234 Maple St' },
        { id: 23, label: 'agGridCustom23', creationDate: '2046', carModel: 'Ford Explorer', price: 45000, address: '567 Cedar St' },
        { id: 24, label: 'agGridCustom24', creationDate: '2047', carModel: 'Chevrolet Equinox', price: 35000, address: '890 Pine St' },
        { id: 25, label: 'agGridCustom25', creationDate: '2048', carModel: 'BMW 5 Series', price: 65000, address: '123 Oak St' },
        { id: 26, label: 'agGridCustom26', creationDate: '2049', carModel: 'Tesla Model X', price: 85000, address: '456 Elm St' },
        { id: 27, label: 'agGridCustom27', creationDate: '2050', carModel: 'Mercedes-Benz GLC', price: 60000, address: '789 Maple St' },
        { id: 28, label: 'agGridCustom28', creationDate: '2051', carModel: 'Audi A6', price: 70000, address: '234 Cedar St' },
        { id: 29, label: 'agGridCustom29', creationDate: '2052', carModel: 'Lexus ES', price: 55000, address: '567 Pine St' },
        { id: 30, label: 'agGridCustom30', creationDate: '2053', carModel: 'Subaru Legacy', price: 31000, address: '890 Elm St' },
        { id: 31, label: 'agGridCustom31', creationDate: '2054', carModel: 'Toyota Highlander', price: 42000, address: '123 Maple St' },
        { id: 32, label: 'agGridCustom32', creationDate: '2055', carModel: 'Honda Pilot', price: 40000, address: '456 Cedar St' },
        { id: 33, label: 'agGridCustom33', creationDate: '2056', carModel: 'Ford Edge', price: 38000, address: '789 Oak St' },
        { id: 34, label: 'agGridCustom34', creationDate: '2057', carModel: 'Chevrolet Blazer', price: 36000, address: '234 Pine St' },
        { id: 35, label: 'agGridCustom35', creationDate: '2058', carModel: 'BMW 7 Series', price: 90000, address: '567 Elm St' },
        { id: 36, label: 'agGridCustom36', creationDate: '2059', carModel: 'Tesla Model Y', price: 75000, address: '890 Maple St' },
        { id: 37, label: 'agGridCustom37', creationDate: '2060', carModel: 'Mercedes-Benz GLE', price: 85000, address: '123 Cedar St' },
        { id: 38, label: 'agGridCustom38', creationDate: '2061', carModel: 'Audi Q7', price: 80000, address: '456 Oak St' },
        { id: 39, label: 'agGridCustom39', creationDate: '2062', carModel: 'Lexus GS', price: 68000, address: '789 Elm St' },
        { id: 40, label: 'agGridCustom40', creationDate: '2063', carModel: 'Subaru Impreza', price: 28000, address: '234 Maple St' },
        { id: 41, label: 'agGridCustom41', creationDate: '2064', carModel: 'Toyota Corolla', price: 24000, address: '567 Cedar St' },
        { id: 42, label: 'agGridCustom42', creationDate: '2065', carModel: 'Honda Odyssey', price: 35000, address: '890 Pine St' },
        { id: 43, label: 'agGridCustom43', creationDate: '2066', carModel: 'Ford Expedition', price: 60000, address: '123 Oak St' },
        { id: 44, label: 'agGridCustom44', creationDate: '2067', carModel: 'Chevrolet Traverse', price: 42000, address: '456 Elm St' },
        { id: 45, label: 'agGridCustom45', creationDate: '2068', carModel: 'BMW X3', price: 58000, address: '789 Maple St' },
        { id: 46, label: 'agGridCustom46', creationDate: '2069', carModel: 'Tesla Model C', price: 68000, address: '234 Cedar St' },
        { id: 47, label: 'agGridCustom47', creationDate: '2070', carModel: 'Mercedes-Benz GLA', price: 55000, address: '567 Pine St' },
        { id: 48, label: 'agGridCustom48', creationDate: '2071', carModel: 'Audi A5', price: 48000, address: '890 Oak St' },
        { id: 49, label: 'agGridCustom49', creationDate: '2072', carModel: 'Lexus IS', price: 45000, address: '123 Main St' },
        { id: 50, label: 'agGridCustom50', creationDate: '2073', carModel: 'Subaru Crosstrek', price: 31000, address: '456 Elm St' },
        { id: 51, label: 'agGridCustom51', creationDate: '2074', carModel: 'Toyota Tacoma', price: 35000, address: '789 Pine St' },
        { id: 52, label: 'agGridCustom52', creationDate: '2075', carModel: 'Honda Fit', price: 22000, address: '234 Oak St' },
        { id: 53, label: 'agGridCustom53', creationDate: '2076', carModel: 'Ford Ranger', price: 28000, address: '567 Maple St' },
        { id: 54, label: 'agGridCustom54', creationDate: '2077', carModel: 'Chevrolet Camaro', price: 55000, address: '890 Cedar St' },
        { id: 55, label: 'agGridCustom55', creationDate: '2078', carModel: 'BMW X7', price: 95000, address: '123 Pine St' },
        { id: 56, label: 'agGridCustom56', creationDate: '2079', carModel: 'Tesla Model Roadster', price: 120000, address: '456 Elm St' },
        { id: 57, label: 'agGridCustom57', creationDate: '2080', carModel: 'Mercedes-Benz S-Class', price: 100000, address: '789 Oak St' },
        { id: 58, label: 'agGridCustom58', creationDate: '2081', carModel: 'Audi Q3', price: 45000, address: '234 Maple St' },
        { id: 59, label: 'agGridCustom59', creationDate: '2082', carModel: 'Lexus LC', price: 95000, address: '567 Cedar St' },
        { id: 60, label: 'agGridCustom60', creationDate: '2083', carModel: 'Subaru WRX', price: 32000, address: '890 Elm St' },
        { id: 61, label: 'agGridCustom61', creationDate: '2084', carModel: 'Toyota Sienna', price: 40000, address: '123 Maple St' },
        { id: 62, label: 'agGridCustom62', creationDate: '2085', carModel: 'Honda HR-V', price: 27000, address: '456 Cedar St' },
        { id: 63, label: 'agGridCustom63', creationDate: '2086', carModel: 'Ford Bronco', price: 50000, address: '789 Pine St' },
        { id: 64, label: 'agGridCustom64', creationDate: '2087', carModel: 'Chevrolet Corvette', price: 70000, address: '234 Oak St' },
        { id: 65, label: 'agGridCustom65', creationDate: '2088', carModel: 'BMW X6', price: 85000, address: '567 Maple St' },
        { id: 66, label: 'agGridCustom66', creationDate: '2089', carModel: 'Tesla Cybertruck', price: 70000, address: '890 Cedar St' },
        { id: 67, label: 'agGridCustom67', creationDate: '2090', carModel: 'Mercedes-Benz A-Class', price: 40000, address: '123 Pine St' },
        { id: 68, label: 'agGridCustom68', creationDate: '2091', carModel: 'Audi A8', price: 85000, address: '456 Elm St' },
        { id: 69, label: 'agGridCustom69', creationDate: '2092', carModel: 'Lexus LS', price: 120000, address: '789 Oak St' },
        { id: 70, label: 'agGridCustom70', creationDate: '2093', carModel: 'Subaru Ascent', price: 42000, address: '234 Maple St' },
        { id: 71, label: 'agGridCustom71', creationDate: '2094', carModel: 'Toyota 4Runner', price: 45000, address: '567 Cedar St' },
        { id: 72, label: 'agGridCustom72', creationDate: '2095', carModel: 'Honda Ridgeline', price: 38000, address: '890 Pine St' },
        { id: 73, label: 'agGridCustom73', creationDate: '2096', carModel: 'Ford Transit', price: 60000, address: '123 Oak St' },
        { id: 74, label: 'agGridCustom74', creationDate: '2097', carModel: 'Chevrolet Suburban', price: 65000, address: '456 Elm St' },
        { id: 75, label: 'agGridCustom75', creationDate: '2098', carModel: 'BMW X4', price: 63000, address: '789 Maple St' },
        { id: 76, label: 'agGridCustom76', creationDate: '2099', carModel: 'Tesla Model Z', price: 80000, address: '234 Cedar St' },
        { id: 77, label: 'agGridCustom77', creationDate: '2100', carModel: 'Mercedes-Benz CLA', price: 40000, address: '567 Pine St' },
        { id: 78, label: 'agGridCustom78', creationDate: '2101', carModel: 'Audi TT', price: 55000, address: '890 Oak St' },
        { id: 79, label: 'agGridCustom79', creationDate: '2102', carModel: 'Lexus UX', price: 38000, address: '123 Main St' },
        { id: 80, label: 'agGridCustom80', creationDate: '2103', carModel: 'Subaru BRZ', price: 30000, address: '456 Elm St' },
        { id: 81, label: 'agGridCustom81', creationDate: '2104', carModel: 'Toyota Tundra', price: 45000, address: '789 Pine St' },
        { id: 82, label: 'agGridCustom82', creationDate: '2105', carModel: 'Honda Accord Hybrid', price: 30000, address: '234 Oak St' },
        { id: 83, label: 'agGridCustom83', creationDate: '2106', carModel: 'Ford Mustang Mach-E', price: 60000, address: '567 Maple St' },
        { id: 84, label: 'agGridCustom84', creationDate: '2107', carModel: 'Chevrolet Silverado HD', price: 70000, address: '890 Cedar St' },
        { id: 85, label: 'agGridCustom85', creationDate: '2108', carModel: 'BMW X1', price: 40000, address: '123 Pine St' },
        { id: 86, label: 'agGridCustom86', creationDate: '2109', carModel: 'Tesla Model B', price: 100000, address: '456 Elm St' },
        { id: 87, label: 'agGridCustom87', creationDate: '2110', carModel: 'Mercedes-Benz CLS', price: 80000, address: '789 Oak St' },
        { id: 88, label: 'agGridCustom88', creationDate: '2111', carModel: 'Audi R8', price: 150000, address: '234 Maple St' },
        { id: 89, label: 'agGridCustom89', creationDate: '2112', carModel: 'Lexus RX Hybrid', price: 52000, address: '567 Cedar St' },
        { id: 90, label: 'agGridCustom90', creationDate: '2113', carModel: 'Subaru XV', price: 29000, address: '890 Pine St' },
        { id: 91, label: 'agGridCustom91', creationDate: '2114', carModel: 'Toyota Avalon', price: 40000, address: '123 Oak St' },
        { id: 92, label: 'agGridCustom92', creationDate: '2115', carModel: 'Honda Clarity', price: 35000, address: '456 Maple St' },
        { id: 93, label: 'agGridCustom93', creationDate: '2116', carModel: 'Ford Super Duty', price: 75000, address: '789 Cedar St' },
        { id: 94, label: 'agGridCustom94', creationDate: '2117', carModel: 'Chevrolet Colorado', price: 35000, address: '123 Pine St' },
        { id: 95, label: 'agGridCustom95', creationDate: '2118', carModel: 'BMW X2', price: 42000, address: '456 Elm St' },
        { id: 96, label: 'agGridCustom96', creationDate: '2119', carModel: 'Tesla Model F', price: 90000, address: '789 Oak St' },
        { id: 97, label: 'agGridCustom97', creationDate: '2120', carModel: 'Mercedes-Benz GLB', price: 50000, address: '234 Cedar St' },
        { id: 98, label: 'agGridCustom98', creationDate: '2121', carModel: 'Audi SQ5', price: 60000, address: '567 Maple St' },
        { id: 99, label: 'agGridCustom99', creationDate: '2122', carModel: 'Lexus LX', price: 90000, address: '890 Pine St' },
        { id: 100, label: 'agGridCustom100', creationDate: '2123', carModel: 'Subaru Levorg', price: 45000, address: '123 Oak St' }
    ],
    toolbarBtns : [] ,
    menuItems : [] ,
    enableMultiRowSelection:false,
    onRowClick : (e) => {
        console.log( 'row clicked ' , e)
    } ,
    onGridReady : (e) => {
        console.log( 'onGridReady ' , e)
    } 
}