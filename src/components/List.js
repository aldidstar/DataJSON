import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import DataJSON from '../data/data.json';

export default function List() {
  const [proformaItem, setProformaItem] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const parsingData = JSON.parse(JSON.stringify(DataJSON));
    setProformaItem(parsingData.proformaItem);
    setLocation(parsingData.location);
  }, []);
  
  const rows = proformaItem.map((item, index) => {
    const parseProductStock = JSON.parse(item.product_stock);
    const parseItems = JSON.parse(item.items);

    const locationStok = location.map((locate) => {
      return parseProductStock.filter((product) => Object.keys(product)[0] == locate.id);
    });
    const totalStok = locationStok[0][0][location[0].id] + locationStok[1][0][location[1].id] + locationStok[2][0][location[2].id];
    const percent = ((parseItems[0].qty / totalStok) * 100).toFixed(2);
    
    return {
      id: item.product_id,
      [location[0].id]: locationStok[0][0][location[0].id],
      [location[1].id]: locationStok[1][0][location[1].id],
      [location[2].id]: locationStok[2][0][location[2].id],
      categoryDescription: item.categoryDescription,
      productDescription: item.productDescription,
      totalStok,
      percent,
      qty: parseItems[0].qty,
    };
  });

  
  return (
      <Table className="table table-striped" >
        <TableHead>
          <TableRow>
            {location.map((locate) => (
              <TableCell >{locate.name}</TableCell>
            ))}
            <TableCell>Category</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Total Stock</TableCell>
            <TableCell>Percent %</TableCell>
            <TableCell>Total Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow >
              {location.map((locate) => (
                <TableCell>{row[locate.id]}</TableCell>
              ))}
              <TableCell>{row.categoryDescription}</TableCell>
              <TableCell>{row.productDescription}</TableCell>
              <TableCell>{row.totalStok}</TableCell>
              <TableCell>{row.percent} %</TableCell>
              <TableCell>{row.qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
  );
}