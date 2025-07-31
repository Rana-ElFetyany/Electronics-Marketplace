import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {
  LaptopProduct,
  Product,
  SmartphoneProduct,
  TabletProduct,
} from '../../Core/interfaces/products';
import { LottieAnimationComponent } from '../../Shared/lottie-animation/lottie-animation.component';
import { LottieLoaderComponent } from '../../Shared/lottie-loader/lottie-loader.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../Core/services/cart.service';
import Swal from 'sweetalert2';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { ComparisonService } from '../../Core/services/comparison.service';
import { ProductComparisonModalComponent } from "../product-comparison-modal/product-comparison-modal.component";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LottieAnimationComponent,
    LottieLoaderComponent,
    FormsModule,
    RouterLink,
    ProductDetailsModalComponent,
    ProductComparisonModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private comparisonService: ComparisonService,
    private router: Router
  ) {
    setTimeout(() => (this.showLoader = false), 7000);
  }

  @ViewChild('lottieAnim') lottieAnim!: LottieAnimationComponent;

  showLoader = true;
  hoveredSidebarItem: string | null = null;
  selectedCompareProducts: any[] = [];
  showCompareModal: boolean = false;

  smartPhones: SmartphoneProduct[] = [];
  laptops: LaptopProduct[] = [];
  tablets: TabletProduct[] = [];

  selectedTab = 'Popular';
  selectedCategory: string = 'Phones';
  showCategoryDropdown = false;
  expandSidebar = false;

  filteredProducts!: (SmartphoneProduct | LaptopProduct | TabletProduct)[];
  cart: any[] = [];
  selectedProduct: any = null;

  sidebarItems = [
    {
      icon: 'bi bi-grid-fill',
      label: 'Dashboard',
      hover: false,
      route: '/Home',
    },
    { icon: 'bi bi-cart', label: 'Cart', hover: false, route: '/Cart' },
    { icon: 'bi bi-people-fill', label: 'Users', hover: false },
    { icon: 'bi bi-bar-chart-fill', label: 'Analytics', hover: false },
    { icon: 'bi bi-gear-fill', label: 'Settings', hover: false },
  ];

  categories: string[] = ['Phones', 'Laptops', 'Tablets'];

  brandsByCategory = {
    Phones: ['Apple', 'Samsung', 'Xiaomi'],
    Laptops: ['Dell', 'HP', 'Lenovo'],
    Tablets: ['iPad', 'Samsung Tab', 'Surface'],
  };

  brands: string[] = [];

  ngOnInit() {
    this.fetchProducts();
  }

  // For Json call (required for the Uni)
  // fetchProducts() {
  //   this.showLoader = true; // show the loader initially

  //   const smartphones$ = this.http.get<SmartphoneProduct[]>(
  //     'http://localhost:3000/smartphones'
  //   );
  //   const laptops$ = this.http.get<LaptopProduct[]>(
  //     'http://localhost:3000/laptops'
  //   );
  //   const tablets$ = this.http.get<TabletProduct[]>(
  //     'http://localhost:3000/tablets'
  //   );

  //   forkJoin([smartphones$, laptops$, tablets$]).subscribe(
  //     ([smartphones, laptops, tablets]) => {
  //       this.smartPhones = smartphones;
  //       this.laptops = laptops;
  //       this.tablets = tablets;

  //       this.filterByCategory(); // make sure filteredProducts is set properly
  //       this.updateBrands(); // update brands for the selected category

  //       this.showLoader = false; // hide loader when all requests are done
  //     },
  //     (error) => {
  //       console.error('Error fetching products:', error);
  //       this.showLoader = false;
  //     }
  //   );
  // }

  fetchProducts() {
    this.showLoader = true;

    const smartphones$ = this.http.get<any>(
      'https://dummyjson.com/products/category/smartphones'
    );
    const laptops$ = this.http.get<any>(
      'https://dummyjson.com/products/category/laptops'
    );
    const tablets$ = this.http.get<any>(
      'https://dummyjson.com/products/category/tablets'
    );

    forkJoin([smartphones$, laptops$, tablets$]).subscribe(
      ([smartphonesRes, laptopsRes, tabletsRes]) => {
        this.smartPhones = smartphonesRes.products;
        this.laptops = laptopsRes.products;
        this.tablets = tabletsRes.products;

        this.filterByCategory();
        this.updateBrands();

        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.showLoader = false;
      }
    );
  }

  playAnimation() {
    this.lottieAnim.play();
  }

  pauseAnimation() {
    this.lottieAnim.pause();
  }

  stopAnimation() {
    this.lottieAnim.stop();
  }

  openProductModal(product: any) {
    this.selectedProduct = product;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }

  addToCart(product: any) {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `"${product.title}" was added to cart!`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#d4edda',
        color: '#155724',
        iconColor: '#28a745',
      });
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: `"${product.title}" is out of stock.`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#f8d7da',
        color: '#721c24',
        iconColor: '#dc3545',
      });
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.updateBrands();
    this.filterByCategory();
  }

  updateBrands() {
    this.brands =
      this.brandsByCategory[
        this.selectedCategory as keyof typeof this.brandsByCategory
      ] || [];
  }

  filterByCategory() {
    if (this.selectedCategory === 'Phones') {
      this.filteredProducts = this.smartPhones;
    } else if (this.selectedCategory === 'Laptops') {
      this.filteredProducts = this.laptops;
    } else if (this.selectedCategory === 'Tablets') {
      this.filteredProducts = this.tablets;
    }
  }

  filterBy(tab: string) {
    this.selectedTab = tab;
    if (tab === 'Cheap') {
      this.filteredProducts = this.smartPhones.filter((p) => p.price < 200);
    } else if (tab === 'Expensive') {
      this.filteredProducts = this.smartPhones.filter((p) => p.price > 500);
    } else {
      this.filteredProducts = this.smartPhones;
    }
  }

  filterBrand(event: any) {
    const brand = event.target.value;
    if (brand) {
      this.filteredProducts = this.smartPhones.filter((p) => p.brand === brand);
    } else {
      this.filteredProducts = this.smartPhones;
    }
  }

  getStars(rating: number): any[] {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(i);
    }
    return stars;
  }

  addToComparison(product: Product) {
    const error = this.comparisonService.addProduct(product);
    if (error) {
      alert(error); // or show toast/snackbar
    } else {
      this.router.navigate(['/Compare']); // navigate to comparison view
    }
  }
  toggleCompare(product: any) {
    const index = this.selectedCompareProducts.findIndex(
      (p) => p.id === product.id
    );
    if (index > -1) {
      this.selectedCompareProducts.splice(index, 1);
    } else {
      if (this.selectedCompareProducts.length < 2) {
        this.selectedCompareProducts.push(product);
      }
    }

    this.showCompareModal = this.selectedCompareProducts.length === 2;
  }

  closeCompareModal() {
    this.showCompareModal = false;
    this.selectedCompareProducts = [];
  }

  isSelectedForCompare(product: any): boolean {
    return this.selectedCompareProducts.some((p) => p.id === product.id);
  }
}
