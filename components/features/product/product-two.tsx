import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';

import { toDecimal } from '~/utils';
import { Product } from '~/utils/types';

type ProductTwoProps = {
  product: Product;
  adClass?: string;
  wishlist: any;
  toggleWishlist?: (product: Product) => any;
  addToCart?: (product: Product) => any;
  openQuickview?: (slug: string) => any;
  showCategories?: boolean;
  isNew?: boolean;
  isTop?: boolean;
};

function ProductTwo(props: ProductTwoProps) {
  const {
    product,
    adClass = 'text-center',
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    showCategories = true,
    isNew,
    isTop,
  } = props;

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add('load-more-overlay', 'loading');

    setTimeout(() => {
      currentTarget.classList.remove('load-more-overlay', 'loading');
    }, 1000);
  };

  const addToCartHandler = (e) => {
    // e.preventDefault();
    // addToCart({ ...product, qty: 1, price: product.price[0] });
  };

  // Rating is a random number between 4 and 5
  const rating = Math.random() * (5 - 4) + 4;
  // Review is a random number between 1 and 100
  const reviews = Math.floor(Math.random() * (100 - 1) + 1);

  return (
    <div className={`product text-left ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/shop/?slug=${product.slug}`}>
          <LazyLoadImage
            alt="product"
            src={product.mainImage}
            threshold={500}
            effect="opacity"
            width="300"
            // height="338"
            height="300"
          />

          {/* {product.pictures.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[1].url}
              threshold={500}
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ''
          )} */}
        </ALink>

        <div className="product-label-group">
          {isNew ? (
            <label className="product-label label-new">Nuevo</label>
          ) : (
            ''
          )}
          {isTop ? <label className="product-label label-top">Top</label> : ''}
          {/* {product.isOnSale  ? (
            product.variants.length === 0 ? (
              <label className="product-label label-sale">
                {product.salePercentage}% OFF
              </label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ''
          )} */}
          {product.isOnSale && (
            <label className="product-label label-sale">
              {product.salePercentage * 100}% OFF
            </label>
          )}
        </div>

        <div className="product-action-vertical">
          {/* {product.variants.length > 0 ? (
            <ALink
              href={`/product/default/${product.slug}`}
              className="btn-product-icon btn-cart"
              title="Go to product"
            >
              <i className="d-icon-arrow-right"></i>
            </ALink>
          ) : (
            <a
              href="#"
              className="btn-product-icon btn-cart"
              title="Add to cart"
              onClick={addToCartHandler}
            >
              <i className="d-icon-bag"></i>
            </a>
          )} */}
          <a
            href="#"
            className="btn-product-icon btn-wishlist"
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? 'd-icon-heart-full' : 'd-icon-heart'}
            ></i>
          </a>
        </div>

        <div className="product-action">
          <ALink
            href="#"
            className="btn-product btn-quickview"
            title="Quick View"
            onClick={showQuickviewHandler}
          >
            Quick View
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        {showCategories ? (
          <div className="product-cat">
            {/* {product.categories
              ? product.categories.map((item, index) => (
                  <React.Fragment key={item.name + '-' + index}>
                    <ALink
                      href={{
                        pathname: '/shop',
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                      {index < product.categories.length - 1 ? ', ' : ''}
                    </ALink>
                  </React.Fragment>
                ))
              : ''} */}
          </div>
        ) : (
          ''
        )}

        <h3 className="product-name">
          <ALink href={`/product/default/${product.slug}`}>
            {product.name}
          </ALink>
        </h3>

        <div className="product-price">
          {/* {product.isOnSale ? (
            product.variants.length === 0 ||
            (product.variants.length > 0 && !product.variants[0].price) ? (
              <>
                <ins className="new-price">${toDecimal(product.finalPrice)}</ins>
                <del className="old-price">${toDecimal(product.price)}</del>
              </>
            ) : (
              <del className="new-price">
                ${toDecimal(product.price[0])} – ${toDecimal(product.finalPrice)}
              </del>
            )
          ) : (
            <ins className="new-price">${toDecimal(product.finalPrice)}</ins>
          )} */}
          {product.isOnSale ? (
            <>
              <ins className="new-price">${toDecimal(product.finalPrice)}</ins>
              <del className="old-price">${toDecimal(product.price)}</del>
            </>
          ) : (
            <ins className="new-price">${toDecimal(product.finalPrice)}</ins>
          )}
        </div>

        <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * rating + '%' }}
            ></span>
            <span className="tooltiptext tooltip-top">{toDecimal(rating)}</span>
          </div>

          <ALink
            href={`/product/default/${product.slug}`}
            className="rating-reviews"
          >
            ( {reviews} reviews )
          </ALink>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  ...modalActions,
})(ProductTwo);
