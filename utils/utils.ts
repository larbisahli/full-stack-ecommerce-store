import { Category } from '@ts-types/generated';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import React from 'react';

export const PRODUCTION_ENV = process.env.NODE_ENV === 'production';

// Utils
export const Timer = (time = 1000) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, time)
  );
  // Timer().then(() => setLoading(false));
};

Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (error) {
    return this;
  }
};

Number.prototype.secondsToHm = function () {
  const d = Number(this);
  if (d < 60) return `${d} seconds`;
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let hDisplay = h > 0 ? h + ' h ' : '';
  let mDisplay = m > 0 ? m + ' min' : '';
  return hDisplay + mDisplay;
};

export const replace = (array, index: number, replacerIndex: number) => {
  let results = [];
  if (array.length === 1) return array;

  try {
    results = [...array];
    results[index] = array[replacerIndex];
    results[replacerIndex] = array[index];
    return results;
  } catch (error) {
    console.log(`error`, error);
    return array;
  }
};

export const mediaURL = PRODUCTION_ENV
  ? process.env.MEDIA_URL
  : 'http://127.0.0.1:5000/media';

export const apiURL = PRODUCTION_ENV
  ? process.env.API_URL
  : 'http://127.0.0.1:5000';

// export const mediaURL = process.env.MEDIA_URL;

// export const apiURL = process.env.API_URL;

function searchTree(element: Category, matchingId: string) {
  if (element?.id === matchingId) {
    return element;
  } else if (element?.children != null) {
    let i: number;
    let result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingId);
    }
    return result;
  }
  return null;
}

function ancestorSearch(element: Category[], matchingId: string) {
  return element?.find((ele) => {
    if (ele?.id === matchingId) {
      return true;
    } else if (ele?.children != null) {
      let i;
      let result = null;
      for (i = 0; result == null && i < ele.children.length; i++) {
        result = searchTree(ele.children[i], matchingId);
      }
      return result;
    }
    return null;
  });
}

function appendChild(element: Category, matchingId: string, child: Category[]) {
  if (element?.id === matchingId) {
    return { ...element, children: [...(element?.children ?? []), ...child] };
  } else {
    return {
      ...element,
      children: element?.children?.map((ele) => {
        if (ele?.id === matchingId) {
          ele.children = [...(ele.children ?? []), ...child];
        } else if (ele?.children != null) {
          ele.children = ele.children?.map((child_ele) => {
            return appendChild(child_ele, matchingId, child);
          });
        }
        return ele;
      })
    };
  }
}

// TODO UNIT TEST
export const appendChildCategory = (
  categories: Category[],
  id: string,
  child: Category[]
) => {
  try {
    const children = ancestorSearch(categories, id);
    const results = appendChild(children, id, child);
    return categories?.map((category) => {
      if (category?.id === results?.id) {
        return results;
      }
      return category;
    });
  } catch (error) {
    // INFO Log to sentry
    return categories;
  }
};

export function pgFormatDate(date) {
  return new Date(new Date(date))
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '');
}

/** Make sure text inside span <div onClick><span></span></div>*/
export const CopyToClipboard = (
  e: React.MouseEvent<HTMLElement>,
  callback: any
) => {
  try {
    const target = e.target as HTMLElement;

    const el = document.createElement('textarea');
    el.style.position = 'fixed';
    el.style.bottom = '-100px';
    el.value = (
      target?.firstElementChild?.innerHTML || target?.innerHTML
    )?.replace('&amp;', '&');

    document.body.appendChild(el);
    el.select();
    navigator?.clipboard
      .writeText(el.value)
      .then(callback(el.value), function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    document.body.removeChild(el);
  } catch (err) {
    console.log('CopyToClipboard', err);
  }
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const limit = 15;

export const selectedVariationOptionFun = ({
  selectedVariations,
  variationOptions
}) => {
  const selectedAttributesOption = selectedVariations?.map(
    (selectedVariation) => {
      return selectedVariation?.value?.id;
    }
  );

  return variationOptions?.find((vop) => {
    return isEqual(sortBy(vop?.options), sortBy(selectedAttributesOption));
  });
};
