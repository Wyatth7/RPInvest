import path from "path";
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.static(path.join(__dirname, "./../../build")));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "./../../build", "index.html"));
});

export default app;

// <div
//   id="apmex-widget-spotprice"
//   style="width:280px;height:200px;background-color:#FFFFFF;border:3px Solid #003A62;"
// >
//   <div id="apmex-widget-spot-frame-target">
//     <iframe
//       src="http://widgets.apmex.com/widget/spotprice/?w=280&amp;h=180&amp;mtls=GSPL&amp;arf=False&amp;rint=5&amp;srf=False&amp;tId=1&amp;cId=ba9595f3-23e6-4bca-8284-4b7b0637b54c&amp;wId=1"
//       frameBorder="0"
//       width="280"
//       height="180"
//       scrolling="no"
//       style="display:block;"
//     ></iframe>
//   </div>
//   <div
//     id="apmex-widget-spot-target-footer"
//     style="text-align: center; text-decoration: none;"
//   >
//     <a
//       href="http://www.apmex.com"
//       target="_blank"
//       style="color: #000000; text-decoration: none;"
//     >
//       <img
//         src="https://widgets.apmex.com/content/themes/logos/blue.png"
//         style="border:0px;"
//       />
//     </a>
//   </div>
// </div>;
