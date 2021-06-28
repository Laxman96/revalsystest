import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'] 
})
export class ListComponent implements OnInit {
  products: any[] =[];
  images: any;
  url = [];
  imageActive = 'segment1';
  orderby: string;
  // hightolow = [];
  // lowtohigh = [];
  // products:any[] =[];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.httpClient.get<any>('assets/sampleData.json').subscribe((data) => {
      this.products = data.products;
      console.log(this.products);
      this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        // this.orderby = params.orderby;
        // console.log(this.orderby); // price
        let event = {
        	target: {
          	value: ''
          }
        };
        if (params.sort === 'highToLow') {
        	event.target.value = 'High';
        } else {
        	event.target.value = 'Low';
        }
        
        this.sort(event);
      }
    );
      
      // const imgurl = data.products[0].ListImagePath;
      // const img = data.products[0].Images.split('|');
      // for (let i = 0; i < img.length; i++) {
      //   this.url[i] = imgurl + img[i];
      // }


    });
    // Default sort order on page load
    this.products = this.products.sort((low, high) => low.Price - high.Price);
  }

  quarypram(event: any){
    switch (event.target.value) {
      case "Low":
        {
          // this.products = this.products.sort((low, high) => low.Price - high.Price);
          this.router.navigate(['/list'], { queryParams: { sort: 'LowTohigh' } });
          
          break;
        }

      case "High":
        {
          // this.products = this.products.sort((low, high) => high.Price - low.Price);
          this.router.navigate(['/list'], { queryParams: { sort: 'highToLow' } });
          break;
        }

      }
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.products = this.products.sort((low, high) => low.Price - high.Price);
          break;
        }

      case "High":
        {
          this.products = this.products.sort((low, high) => high.Price - low.Price);
          break;
        }

      // case "Name":
      //   {
      //     this.products = this.products.sort(function (low, high) {
      //       if (low.Name < high.Name) {
      //         return -1;
      //       }
      //       else if (low.Name > high.Name) {
      //         return 1;
      //       }
      //       else {
      //         return 0;
      //       }
      //     })
      //     break;
      //   }

      default: {
        this.products = this.products.sort((low, high) => low.Price - high.Price);
        break;
      }

    }
    return this.products; 


  }

  selected(one: any) {
    this.imageActive = one;
  }

}
