import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  categories = [
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1616715623022-65d18f0042ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcyfHxmYXNoaW9ufGVufDB8fDB8fHww',
     
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=60',
      category: 'accessories'
    },
    {
      name: 'Dresses',
      image: 'https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?w=600&auto=format&fit=crop&q=60',
      category: 'dresses'
    },
    {
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=60',
      category: 'shoes'
    }
  ];

  benefits = [
    {
      icon: '✦',
      title: 'Local Brands',
      text: 'Discover unique fashion from local brands.'
    },
    {
      icon: '♡',
      title: 'Easy Shopping',
      text: 'Find your favorite pieces in just a few clicks.'
    },
    {
      icon: '✧',
      title: 'Best Offers',
      text: 'Enjoy great deals and exclusive discounts.'
    },
    {
      icon: '✓',
      title: 'Unique Style',
      text: 'Find styles that match your personality.'
    }
  ];

}