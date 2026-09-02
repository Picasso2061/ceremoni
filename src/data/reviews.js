const reviews = [
  // The Grand Monarch Hall (v001)
  { id: 'r001', vendorId: 'v001', author: 'Adaeze Nwosu', rating: 5, date: '2026-07-15', comment: 'The Grand Monarch was absolutely breathtaking for our wedding! The ballroom was even more beautiful in person. The staff handled everything seamlessly. We still get compliments from our guests months later.' },
  { id: 'r002', vendorId: 'v001', author: 'Tunde Ajayi', rating: 5, date: '2026-06-22', comment: 'Used the garden terrace for my parents\' memorial service. The setting was peaceful and dignified. The team was incredibly respectful and accommodating during a difficult time.' },
  { id: 'r003', vendorId: 'v001', author: 'Fatima Bello', rating: 4, date: '2026-05-10', comment: 'Beautiful venue with great amenities. Only reason for 4 stars is parking was a bit tight for our 400+ guests. Otherwise, the space itself is absolutely stunning.' },

  // Saveur Catering Co. (v002)
  { id: 'r004', vendorId: 'v002', author: 'Chidinma Eze', rating: 5, date: '2026-07-20', comment: 'Saveur made our wedding reception unforgettable! Their jollof rice literally had guests fighting over seconds. The presentation was five-star quality. Cannot recommend enough!' },
  { id: 'r005', vendorId: 'v002', author: 'Ibrahim Musa', rating: 4, date: '2026-06-15', comment: 'Great food and professional service. The buffet was well-stocked throughout the event. Would have loved more variety in the dessert options, but the main courses were spectacular.' },
  { id: 'r006', vendorId: 'v002', author: 'Ngozi Okonkwo', rating: 5, date: '2026-04-28', comment: 'Hired them for a funeral reception with 200 guests. Despite the short notice, they delivered exceptional food and handled the somber occasion with appropriate care.' },

  // Lumière Studios (v003)
  { id: 'r007', vendorId: 'v003', author: 'Kemi Adeleke', rating: 5, date: '2026-08-02', comment: 'Our wedding photos and video are absolutely MAGICAL. Lumière captured moments we didn\'t even know happened. The cinematic highlight reel made us cry happy tears all over again.' },
  { id: 'r008', vendorId: 'v003', author: 'Obinna Chukwu', rating: 5, date: '2026-07-08', comment: 'Worth every naira! The team was professional, creative, and so personable. They made everyone comfortable in front of the camera. Our album looks like a magazine spread.' },
  { id: 'r009', vendorId: 'v003', author: 'Amara Johnson', rating: 5, date: '2026-06-30', comment: 'Lumière documented my grandmother\'s celebration of life ceremony beautifully. The photos captured the love and respect everyone had for her. A priceless keepsake for our family.' },

  // Bloom & Petal Designs (v004)
  { id: 'r010', vendorId: 'v004', author: 'Blessing Ogbonna', rating: 5, date: '2026-07-25', comment: 'Bloom & Petal transformed our venue into a fairy-tale garden! The floral installations were jaw-dropping. Every guest was taking photos of the décor — it was that stunning.' },
  { id: 'r011', vendorId: 'v004', author: 'Yusuf Abdullahi', rating: 4, date: '2026-06-18', comment: 'Good work on the funeral arrangements. The white and green floral tribute was tasteful and elegant. Communication could have been a bit better during planning, but the result was beautiful.' },

  // DJ Phantom (v005)
  { id: 'r012', vendorId: 'v005', author: 'Sandra Obi', rating: 5, date: '2026-07-30', comment: 'DJ Phantom OWNED our reception! The dance floor was packed from start to finish. He read the crowd perfectly — from the old-school highlife for the parents to the Afrobeats for the younger crowd.' },
  { id: 'r013', vendorId: 'v005', author: 'Emeka Onuoha', rating: 4, date: '2026-06-25', comment: 'Great music selection and energy. The sound system was top-notch. Deducting one star because he arrived 30 minutes late, but once he started, it was non-stop vibes.' },

  // Chief Emeka Okafor (v006)
  { id: 'r014', vendorId: 'v006', author: 'Grace Nnamdi', rating: 5, date: '2026-07-12', comment: 'Chief Emeka was the perfect MC for our traditional wedding! His knowledge of Igbo customs was invaluable, and his humor kept everyone entertained. A true professional.' },
  { id: 'r015', vendorId: 'v006', author: 'Augustine Onyema', rating: 5, date: '2026-05-20', comment: 'He MC\'d my father\'s funeral with such dignity and warmth. He knew exactly when to be solemn and when to share uplifting stories. Everyone commented on how well he handled the ceremony.' },

  // Aura Bridal House (v007)
  { id: 'r016', vendorId: 'v007', author: 'Folake Adeyemi', rating: 5, date: '2026-08-05', comment: 'My wedding gown from Aura was a DREAM! The designers understood my vision perfectly. I felt like royalty walking down the aisle. The makeup team also did an incredible job.' },
  { id: 'r017', vendorId: 'v007', author: 'Priscilla Udo', rating: 5, date: '2026-07-18', comment: 'The bridal package was comprehensive and worth it. From fittings to final styling on the day, Aura took care of everything. My husband\'s suit was also impeccable.' },

  // Royal Fleet Motors (v008)
  { id: 'r018', vendorId: 'v008', author: 'Damilola Ogunleye', rating: 5, date: '2026-07-28', comment: 'The Rolls-Royce was absolutely magnificent for our wedding day arrival. The driver was professional, punctual, and even had champagne ready. Made us feel like royalty!' },
  { id: 'r019', vendorId: 'v008', author: 'Kunle Fashola', rating: 4, date: '2026-06-10', comment: 'Used their shuttle service for a burial ceremony. The buses were clean and the drivers were respectful. Minor scheduling hiccup but they resolved it quickly.' },

  // Serenity Gardens (v009)
  { id: 'r020', vendorId: 'v009', author: 'Bola Akinwunmi', rating: 5, date: '2026-07-05', comment: 'What an amazing venue for the price! The garden was beautiful and well-maintained. Perfect for our intimate wedding of 150 guests. The staff was friendly and helpful.' },
  { id: 'r021', vendorId: 'v009', author: 'Michael Okon', rating: 4, date: '2026-06-12', comment: 'Nice venue, great value for money. The natural setting added to the ambiance of the memorial service. Would have liked better lighting in the evening, but overall very satisfied.' },

  // Palette Kitchen (v010)
  { id: 'r022', vendorId: 'v010', author: 'Nneka Okafor', rating: 5, date: '2026-08-10', comment: 'Palette Kitchen delivered a culinary masterpiece at our wedding. The jollof rice is legendary for good reason! The fine dining presentation impressed all our international guests.' },

  // FrameStory Media (v011)
  { id: 'r023', vendorId: 'v011', author: 'Halima Suleiman', rating: 5, date: '2026-07-22', comment: 'FrameStory captured our wedding in the most natural, beautiful way. No stiff poses — just real moments and genuine emotion. The photo book they created is a treasure.' },

  // Harmony Live Band (v012)
  { id: 'r024', vendorId: 'v012', author: 'Chika Emenike', rating: 5, date: '2026-08-01', comment: 'Harmony Live Band had EVERYONE dancing! From my 80-year-old grandmother to the kids. Their versatility is unmatched — they played highlife, jazz, and even threw in some Wizkid covers!' },

  // Ethereal Décor (v013)
  { id: 'r025', vendorId: 'v013', author: 'Olumide Bankole', rating: 5, date: '2026-07-10', comment: 'Ethereal literally created a fantasy world for our wedding. The suspended floral ceiling and the LED-lit aisle left everyone speechless. Worth every single naira.' },
  { id: 'r026', vendorId: 'v013', author: 'Tosin Martins', rating: 5, date: '2026-06-05', comment: 'They styled my mother\'s funeral with such elegance and respect. The white and purple theme was exactly what we wanted. The attention to detail was remarkable.' },

  // Grace & Words (v014)
  { id: 'r027', vendorId: 'v014', author: 'Ruth Obaseki', rating: 4, date: '2026-06-28', comment: 'The officiant was warm and made our ceremony feel personal and special. Good value for money and very professional throughout the planning process.' },

  // Adire & Thread (v015)
  { id: 'r028', vendorId: 'v015', author: 'Sade Afolabi', rating: 5, date: '2026-07-15', comment: 'The aso-oke set was absolutely gorgeous! You can tell these are made by true artisans. The fabric quality is unmatched and the colors were exactly what we wanted for our traditional wedding.' },

  // Swift Convoy (v016)
  { id: 'r029', vendorId: 'v016', author: 'Peter Okonkwo', rating: 4, date: '2026-06-20', comment: 'Reliable and affordable transport service. The buses arrived on time and the drivers were courteous. Good option for events on a budget.' },
];

export default reviews;
