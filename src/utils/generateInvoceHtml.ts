import { moneyFormat } from "./moneyFormat";

export function generateInvoiceHtmnl(invoice: Invoice, date: string) {
	return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body>
			<h3>Ngày mua: ${date}</h3>
      <h3>Khách hàng: ${invoice.customer_name}</h3>
      <table>
         <thead>
            <tr>
               <th>STT</th>
               <th>Sản phẩm</th>
               <th>Đơn vị</th>
               <th>SL</th>
               <th>Giá</th>
               <th>Thành tiền</th>
            </tr>
         </thead>

         <tbody>
         		${invoice.items.reduce(
							(prev, cur, i) =>
								prev +
								`
         				<tr>
		               <td style="text-align: center; font-weight: bold">${i + 1}</td>
		               <td>${cur.product_name}</td>
		               <td>${cur.unit_name}</td>
		               <td>${cur.quantity}</td>
		               <td>${moneyFormat(cur.price)}</td>
		               <td style="text-align: right">${moneyFormat(cur.price * cur.quantity)}</td>
		            </tr>
         				`,
							"",
						)}
            <tr>
               <td colspan="5">Tổng cộng:</td>
               <td style="text-align: right">${moneyFormat(invoice.total_price)}</td>
            </tr>
         </tbody>
      </table>
  </bod>
  <style>

* {
  margin: 0;
  padding: 0;
}

body {
  padding: 3rem;
}
html {
  font-size: 62.5%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}
table th,
table td {
  padding: 0.5rem;
  border: 1px solid #000;
  font-size: 1rem;
}
table th {
  text-transform: uppercase;
  background-color: #f1f1f1;
}

  </style>
</html>
	`;
}
