const UserPageInfo = (props: {
  user: {
    introduction: string,
    email: string,
    is_email_public: boolean,
    is_phone_public: boolean,
    is_gender_public: boolean,
    phone: string,
    gender: string,
    is_birthday_public: boolean,
    birthday: string,
    created_at: Date,
  }
}) => {
  const {user} = props;

  return (
    <>
      <div className='relative border border-gray-200 dark:border-gray-800 rounded-md
          p-3 mt-4
        '>
        <h3 className="font-bold">- 자기소개</h3>
        <p className="whitespace-pre-wrap break-words">
          {user?.introduction || '아직 자기소개가 없습니다.'}
        </p>
      </div>

      {/* 상세 정보 */}
      <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300
       pt-5
       border-t border-gray-200 dark:border-gray-800">
        {user?.is_email_public &&
          <div>
            <h3 className="font-bold">- 이메일

            </h3>
            <p>{user?.email || '이메일 정보 없음'}</p>
          </div>}

        {user?.is_phone_public &&
          <div>
            <h3 className="font-bold">- 전화번호</h3>
            <p>{user?.phone || '전화번호 없음'}</p>
          </div>}

        {user?.is_gender_public &&
          <div>
            <h3 className="font-bold">- 성별</h3>
            <p>{user?.gender || '성별 정보 없음'}</p>
          </div>}

        {user?.is_birthday_public &&
          <div>
            <h3 className="font-bold">- 생일</h3>
            <p>{user?.birthday || '생일 정보 없음'}</p>
          </div>}

        <div>
          <h3 className="font-bold">- 가입일</h3>
          <p>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : '정보 없음'}</p>
        </div>

      </div>
    </>
  );
};

export default UserPageInfo;