import { useMedia } from '@store/helpers/use-media';
import { Element, Link } from 'react-scroll';
import Sticky from 'react-stickynode';

import { siteTermsAndServices } from './data';

const TermsPageContent = () => {
  const { title, date, content } = siteTermsAndServices;
  const mobile = useMedia('(max-width: 767px)');

  const menuItems: string[] = [];
  content.forEach((item) => {
    menuItems.push(item.title);
  });

  return (
    <>
      <div className="w-full m-auto px-4 lg:px-35px pt-40px pb-100px">
        <div className="w-full flex flex-col mb-60px">
          <h3 className="text-24px mb-20px text-gray-900">{title}</h3>
          <p className="text-14px text-gray-900">{`Last update: ${date}`}</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div
            className="w-full md:w-1/3 lg:w-1/4 md:20px"
            style={{ flex: '0 0 auto' }}
          >
            <Sticky top={mobile ? 88 : 150} innerZ="1">
              <div className="w-full pr-4 py-2 md:py-0 bg-white">
                {menuItems.map((item, index) => (
                  <Link
                    activeClass="text-green"
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-130}
                    duration={500}
                    key={index}
                    className="text-14px no-underline text-gray-600 my-10px block capitalize cursor-pointer font-semibold hover:text-gray-900"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </Sticky>
          </div>

          <div className="w-full">
            {content.map((item, idx) => {
              return (
                <Element
                  name={item.title}
                  style={{ paddingBottom: 40 }}
                  key={idx}
                >
                  <h3 className="text-24px text-gray-900 mb-20px">
                    {item.title}
                  </h3>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: item.description
                    }}
                  />
                </Element>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPageContent;
